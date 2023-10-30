import {ActionCreator} from 'redux';

type Action<T> = (props: Omit<T, 'type'>) => T;

const setAuthStateAction: Action<SetAuthStateAction> = props => {
  return {
    type: 'SET_AUTH_STATE',
    ...props,
  };
};

const setMyUserAction: Action<SetMyUserAction> = props => {
  return {
    type: 'SET_MY_USER',
    ...props,
  };
};

const signOutAction: Action<SignOutAction> = () => {
  return {
    type: 'SIGN_OUT',
  };
};

const clearStoreAction: Action<ClearStoreAction> = () => {
  return {
    type: 'CLEAR_STORE',
  };
};

export {setAuthStateAction, setMyUserAction, signOutAction, clearStoreAction};
