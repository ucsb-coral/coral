import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {useSelector} from 'react-redux';
import {store} from '../src/redux/useRedux';
import {
  setTokenDataAction,
  setAuthStateAction,
  setMyUserAction,
  signOutAction,
  setQuarterAction,
} from '../src/redux/actions';
import {useEffect, useRef, useState} from 'react';
import {getUserDocumentRef} from '../src/firebaseReduxUtilities/useUserData';
import * as WebBrowser from 'expo-web-browser';
import {platform} from '../src/utilities/platform';
import {getCurrentCourses} from '../src/firebaseReduxUtilities/useCourseData';
import {API_URL} from '../src/firebaseReduxUtilities/constants';
import {AppState, Linking} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const signOut = () => {
  try {
    auth().signOut();
  } catch (error) {
    console.error(error);
  }
};

export const handleSignIn = async (url: string) => {
  try {
    const urlObject = new URL(url);
    const userId = urlObject.searchParams.get('userId');
    const authToken = urlObject.searchParams.get('authToken');
    const accessToken = urlObject.searchParams.get('accessToken');
    const idToken = urlObject.searchParams.get('idToken');
    const quarter = Number(urlObject.searchParams.get('quarter'));
    if (!userId || !authToken || !accessToken || !idToken || !quarter)
      throw new Error('Missing params');
    await auth().signInWithCustomToken(authToken);
    const myUserDocumentRef = getUserDocumentRef(userId);
    const userData = (await myUserDocumentRef.get()).data() as User | undefined;
    if (!userData) throw new Error('User does not exist');
    store.dispatch(setMyUserAction({id: userId, data: userData}));
    store.dispatch(
      setTokenDataAction({
        data: {accessToken, idToken},
      }),
    );
    store.dispatch(setQuarterAction({quarter}));
    await getCurrentCourses({quarter});
    store.dispatch(setAuthStateAction({authState: 'AUTHENTICATED'}));
  } catch (error) {
    // abortSignIn(nav);
  }
};

export const enterAuthFlow = () =>
  store.dispatch(setAuthStateAction({authState: 'LOADING'}));

function promisify(promise: Promise<any>) {
  let _resolve, _reject;

  let wrap: any = new Promise(async (resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
    let result = await promise;
    resolve(result);
  });

  wrap.resolve = _resolve;
  wrap.reject = _reject;

  return wrap;
}

export default function useAuth() {
  // const authState = useSelector((state: ReduxState) => state.data.authState);
  const signInPromiseRef = useRef<any | null>(null);
  const appStateRef = useRef(AppState.currentState);
  const [appState, setAppState] = useState(appStateRef.current);
  const authState = useSelector((state: ReduxState) => state.data.authState);

  const abortSignIn = () => {
    signInPromiseRef.current?.reject('User cancelled');
    // if (platform === 'ios') WebBrowser.dismissAuthSession();
    store.dispatch(setAuthStateAction({authState: 'NONE'}));
  };

  const signIn = async () => {
    console.log('hi');
    try {
      console.log('hi2');
      const request = await fetch(`${API_URL}/authlink`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      });
      const data = await request.json();
      const {authlink, redirectUri} = data;
      if (!authlink || !redirectUri)
        throw new Error('No authlink or redirectUri');
      console.log('authlink', authlink, 'redirectUri', redirectUri);
      const result = (await WebBrowser.openAuthSessionAsync(
        authlink,
        redirectUri,
      )) as any;
      if (platform === 'ios') {
        if (!result?.url || result?.url === 'coral://error')
          throw new Error('No url returned');
        handleSignIn(result.url);
      }
    } catch (error) {
      console.error(error);
      abortSignIn();
    }
  };

  useEffect(() => {
    const onAuthStateChanged = async (
      firebaseUser: FirebaseAuthTypes.User | null,
    ) => {
      if (!firebaseUser) {
        if (store.getState().data.authState !== 'NONE')
          store.dispatch(signOutAction({}));
      }
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    switch (authState) {
      case 'NONE': {
        if (platform === 'android') WebBrowser.coolDownAsync();
        Linking.removeAllListeners('url');
        break;
      }
      case 'LOADING': {
        // if (platform === 'android')
        Linking.addEventListener('url', ({url}) => {
          store.dispatch(setAuthStateAction({authState: 'LINK_RECEIVED'}));
          console.log('url', url);
          if (url === 'coral://error') abortSignIn();
          else if (platform === 'android') handleSignIn(url);
        });
        signInPromiseRef.current = promisify(signIn());
        break;
      }
      case 'AUTHENTICATED': {
        Linking.removeAllListeners('url');
        break;
      }
      default:
        break;
    }
  }, [authState]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      appStateRef.current = nextAppState;
      setAppState(appStateRef.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    console.log('authState', authState);
  }, [authState]);

  useEffect(() => {
    const authState = store.getState().data.authState;
    if (
      platform === 'android' &&
      appState === 'active' &&
      authState === 'LOADING'
    ) {
      abortSignIn();
    }
  }, [appState]);

  // useEffect(() => {
  //   console.log('state', state);
  // }, [state]);

  return {authState};
}
