import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
  User as GoogleUser,
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

const userFromGoogleUser = ({user}: GoogleUser): User => {
  const {givenName, familyName, email, photo} = user;
  return {firstName: givenName, lastName: familyName, email, photo};
};

export const signInWithGoogle = async () => {
  store.dispatch(setAuthStateAction({authState: 'LOADING'}));
  try {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});

    const response: GoogleUser = await GoogleSignin.signIn();
    const {user, idToken} = response;

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // // Sign-in the user with the credential
    await auth().signInWithCredential(googleCredential);
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

export const signOut = () => {
  try {
    GoogleSignin.signOut();
    auth().signOut();
  } catch (error) {
    console.error(error);
  }
};

export default function useAuth() {
  const state = useSelector((state: ReduxState) => state);
  const authState = useSelector((state: ReduxState) => state.data.authState);

  useEffect(() => {
    const onAuthStateChanged = async (
      firebaseUser: FirebaseAuthTypes.User | null,
    ) => {
      if (!firebaseUser) store.dispatch(signOutAction({}));
      else {
        const {uid} = firebaseUser;
        const user: GoogleUser | null = await GoogleSignin.getCurrentUser();
        if (!user) store.dispatch(signOutAction({}));
        else {
          const id = `usr${uid}`;
          const myUser: User = userFromGoogleUser(user);
          await setMyUserFirebaseRedux(id, myUser);
          store.dispatch(setAuthStateAction({authState: 'AUTHENTICATED'}));
        }
      }
    };
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    console.log('STATE', state);
  }, [state]);

  return {authState};
}
