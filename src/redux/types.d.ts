declare type SetAuthStateAction = {
  type: 'SET_AUTH_STATE';
  authState: AuthState;
};

declare type SetMyUserAction = {
  type: 'SET_MY_USER';
  id: string;
  user: User;
};

declare type JoinChatAction = {
  type: 'JOIN_CHAT';
  id: string;
  chat: Chat;
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
  | JoinChatAction
  | SignOutAction
  | ClearStoreAction;

declare type Data = {
  authState: AuthState;
  myUserId: string;
  usermap: Usermap;
  chatmap: Chatmap;
};

declare type ReduxState = {
  data: Data;
};

declare type AuthState = 'NONE' | 'LOADING' | 'AUTHENTICATED';

declare type Usermap = {
  [id: string]: User;
};

declare type Chatmap = {
  [id: string]: Chat;
};

declare type User = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  photo?: string | null;
  chats?: string[] | null;
};

declare type Message = {
  content: string;
};

declare type Chat = {
  title: string;
  memberIds: string[];
  messages: Message[];
};

declare type TimeLocation = {
  section: string;
  instructionTypeCode: string;
  days: string;
  beginTime: string;
  endTime: string;
  buildingRoom: string;
  instructors: [
    {
      name: string;
      functionCode: string;
    },
  ];
};

declare type Course = {
  courseId: string;
  quarter: string;
  enrollCode: string;
  gradingOptionCode: string;
  unitsAttempted: number;
  courseTitle: string;
  session: string;
  repeatTypeCode: string;
  timeLocations: TimeLocation[];
};
