declare type SetReduxTestAction = {
  type: 'SET_REDUX_TEST';
  reduxTest: boolean;
};

declare type ActionTypes = SetReduxTestAction;

declare type Data = {
  user: User;
  reduxTest: boolean;
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
} | null;
