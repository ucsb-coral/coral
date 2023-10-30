declare type SetAuthStateAction = {
  type: 'SET_AUTH_STATE';
  authState: AuthState;
};

declare type SetMyUserAction = {
  type: 'SET_MY_USER';
  id: string;
  user: User;
};

declare type SignOutAction = {
  type: 'SIGN_OUT';
};

declare type ClearStoreAction = {
  type: 'CLEAR_STORE';
};

declare type ActionTypes =
  | SetAuthStateAction
  | SetMyUserAction
  | SignOutAction
  | ClearStoreAction;

declare type Data = {
  authState: AuthState;
  myUserId: string | null;
  usermap: Usermap;
};

declare type ReduxState = {
  data: Data;
};

declare type AuthState = 'NONE' | 'LOADING' | 'AUTHENTICATED';

declare type Usermap = {
  [id: string]: User;
};

declare type User = {
  email: string;
  firstName: string | null;
  lastName: string | null;
  photo: string | null;
};
