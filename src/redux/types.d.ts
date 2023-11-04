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

declare type SetChatsAction = {
  type: 'SET_CHATS';
  chatmap: Chatmap;
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
  | SetChatsAction
  | SignOutAction
  | ClearStoreAction;

declare type Data = {
  authState: AuthState;
  myUserId: string;
  usermap: Usermap;
  chatmap: Chatmap;
  coursemap: Coursemap;
};

declare type ReduxState = {
  data: Data;
};

declare type AuthState = 'NONE' | 'LOADING' | 'AUTHENTICATED';

declare type Usermap = {
  [id: string]: User;
};

declare type Coursemap = {
  [id: string]: Course;
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
  quarter: string;
  enrollCode: string;
  gradingOptionCode: string;
  unitsAttempted: number;
  courseTitle: string;
  session: string;
  repeatTypeCode: string;
  timeLocations: TimeLocation[];
};
