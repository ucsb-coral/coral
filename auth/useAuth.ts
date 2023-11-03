import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';
import {store} from '../src/redux/useRedux';
import {
  clearStoreAction,
  setAuthStateAction,
  setMyUserAction,
  signOutAction,
} from '../src/redux/actions';
import {useEffect} from 'react';
import {setMyUserFirebaseRedux} from '../src/firebaseReduxUtilities/useUserData';

GoogleSignin.configure({
  webClientId:
    '1030381352952-ee9ti00cphj8j3blqiu4epcf95101dai.apps.googleusercontent.com',
  hostedDomain: 'ucsb.edu',
  forceCodeForRefreshToken: true,
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  store.dispatch(setAuthStateAction({authState: 'LOADING'}));
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const response = await GoogleSignin.signIn();
    const {user, idToken} = response;

    console.log(idToken, user);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    const id = `usr${userCredential.user.uid}`;
    // const idTokenResult = await userCredential.user.getIdTokenResult();
    console.log('IDS', id);

    const myUser: User = {
      firstName: user.givenName,
      lastName: user.familyName,
      email: user.email,
      photo: user.photo,
    };
    setMyUserFirebaseRedux(id, myUser);
    store.dispatch(setAuthStateAction({authState: 'AUTHENTICATED'}));
  } catch (error: any) {
    console.warn(error);
    store.dispatch(setAuthStateAction({authState: 'NONE'}));
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
  }
};

export const signOut = async () => {
  store.dispatch(clearStoreAction({}));
  try {
    await GoogleSignin.signOut();
    store.dispatch(signOutAction({}));
  } catch (error) {
    console.error(error);
  }
};

export default function useAuth() {
  const state = useSelector((state: ReduxState) => state);
  const authState = useSelector((state: ReduxState) => state.data.authState);

  useEffect(() => {
    console.log('STATE', state);
  }, [state]);

  return {authState};
}
