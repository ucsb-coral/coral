declare type SetAuthStateAction = {
  type: 'SET_AUTH_STATE';
  authState: AuthState;
};

declare type SetGoogleUserAction = {
  type: 'SET_GOOGLE_USER';
  googleUser: GoogleUser | null;
};

declare type ActionTypes = SetAuthStateAction | SetGoogleUserAction;

declare type Data = {
  user: User | null;
  googleUser: GoogleUser | null;
  authState: AuthState;
};

declare type ReduxState = {
  data: Data;
};

declare type User = {
  id: string;
  email: string;
  perm: number;
  firstName: string;
  lastName: string;
};

declare type AuthState = 'NONE' | 'LOADING' | 'AUTHENTICATED';

declare type GoogleUser = {
  id: string;
  email: string;
  givenName: string | null;
  familyName: string | null;
  photo: string | null;
};
