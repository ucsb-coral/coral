import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useSelector} from 'react-redux';
import {store} from '../src/redux/useRedux';
import {setAuthStateAction, setGoogleUserAction} from '../src/redux/actions';

GoogleSignin.configure({
  webClientId:
    '1030381352952-ee9ti00cphj8j3blqiu4epcf95101dai.apps.googleusercontent.com',
  hostedDomain: 'ucsb.edu',
  forceCodeForRefreshToken: true,
  offlineAccess: true,
});

export const signInWithGoogle = async () => {
  store.dispatch(setAuthStateAction('LOADING'));
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const response = await GoogleSignin.signIn();
    const {user, idToken} = response;

    console.log(idToken, user);
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log('userCredential', idToken, user);
    const idTokenResult = await userCredential.user.getIdTokenResult();

    store.dispatch(setGoogleUserAction(user));
    store.dispatch(setAuthStateAction('AUTHENTICATED'));
  } catch (error: any) {
    console.warn(error);
    store.dispatch(setAuthStateAction('NONE'));
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
  try {
    await GoogleSignin.signOut();
    store.dispatch(setAuthStateAction('NONE'));
    store.dispatch(setGoogleUserAction(null));
  } catch (error) {
    console.error(error);
  }
};

export default function useAuth() {
  const authState = useSelector((state: ReduxState) => state.data.authState);
  console.log(authState);
  return {authState};
}
