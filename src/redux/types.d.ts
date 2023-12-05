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

declare type LoadCoursesAction = {
  type: 'LOAD_COURSES';
  coursemap: Coursemap;
};

declare type JoinCourseAction = {
  type: 'JOIN_COURSE';
  id: string;
  course: Course;
};

declare type LeaveCourseAction = {
  type: 'LEAVE_COURSE';
  id: string;
  course: Course;
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
  | LoadCoursesAction
  | JoinCourseAction
  | LeaveCourseAction
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

declare type Messagemap = {
  [id: string]: Message;
};

declare type User = {
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  preferredName?: string | null;
  photo?: string | null;
  chats?: string[] | null;
  courses?: string[] | null;
  bio?: string | null;
  status?: boolean | null;
};

declare type MessageType_TEXT = 'TEXT';
declare type MessageType_IMAGE = 'IMAGE';
declare type MessageType_VIDEO = 'VIDEO';
declare type MessageType_FILE = 'FILE';

declare type TextMessageContent = string;
declare type MessageContent = TextMessageContent;

declare type Message = {
  type: MessageType_TEXT | MessageType_IMAGE | MessageType_VIDEO | MessageType_FILE;
  content?: MessageContent;
  contentURL? : string;
  fromUserName: string;
  fromUserId: string;
  createdAt: Date;
  fileName?: string;
};

declare type Chat = {
  memberIds: string[];
  messages: string[];
  messagemap: Messagemap;
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
  memberIds: string[];
  courseId: string;
  quarter: string;
  enrollCode: string;
  gradingOptionCode: string;
  unitsAttempted: number;
  courseTitle: string;
  session: string;
  repeatTypeCode: string;
  timeLocations: TimeLocation[];
  waitlist: boolean;
};
