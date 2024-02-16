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
import {useEffect} from 'react';
import {getUserDocumentRef} from '../src/firebaseReduxUtilities/useUserData';
import * as WebBrowser from 'expo-web-browser';
import {getChatDocumentRef} from '../src/firebaseReduxUtilities/useChatData';
import {platform} from '../src/utilities/platform';
import {getCurrentCourses} from '../src/firebaseReduxUtilities/useCourseData';

export const signOut = () => {
  try {
    auth().signOut();
  } catch (error) {
    console.error(error);
  }
};

const abortSignIn = () => {
  store.dispatch(setAuthStateAction({authState: 'NONE'}));
  signOut();
  if (platform === 'ios') WebBrowser.dismissAuthSession();
};
// abortSignIn();
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
    abortSignIn();
  }
};

// currently handles android auth redirect in linking.ts
export const signIn = async () => {
  store.dispatch(setAuthStateAction({authState: 'LOADING'}));
  try {
    const request = await fetch(
      `https://us-central1-coral-406419.cloudfunctions.net/api/authlink`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
      },
    );
    const data = await request.json();
    const {authlink, redirectUri} = data;
    if (!authlink || !redirectUri) return;
    const result = (await WebBrowser.openAuthSessionAsync(
      authlink,
      redirectUri,
    )) as WebBrowser.WebBrowserRedirectResult;
    if (platform === 'ios') {
      if (!result?.url) throw new Error('No url returned');
      handleSignIn(result.url);
    }
  } catch (error) {
    // abortSignIn();
  }
};

export default function useAuth() {
  const state = useSelector((state: ReduxState) => state);
  const authState = useSelector((state: ReduxState) => state.data.authState);

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
    console.log('state', state);
  }, [state]);

  return {authState};
}
