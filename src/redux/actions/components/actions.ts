import {ActionCreator} from 'redux';

const setAuthStateAction: ActionCreator<SetAuthStateAction> = (
  authState: AuthState,
) => {
  return {
    type: 'SET_AUTH_STATE',
    authState,
  };
};

const setGoogleUserAction: ActionCreator<SetGoogleUserAction> = (
  googleUser: GoogleUser | null,
) => {
  return {
    type: 'SET_GOOGLE_USER',
    googleUser,
  };
};

export {setAuthStateAction, setGoogleUserAction};
