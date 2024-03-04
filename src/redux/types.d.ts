declare type SetAuthStateAction = {
  type: 'SET_AUTH_STATE';
  authState: AuthState;
};

declare type SetMyUserAction = {
  type: 'SET_MY_USER';
  id: string;
  data: User;
};

declare type UpdateMyUserAction = {
  type: 'UPDATE_MY_USER';
  data: MutableUser;
};

declare type JoinChatAction = {
  type: 'JOIN_CHAT';
  id: string;
};

declare type LeaveChatAction = {
  type: 'LEAVE_CHAT';
  id: string;
};

declare type SetTokenDataAction = {
  type: 'SET_TOKEN_DATA';
  data: TokenData;
};

declare type RefreshTokenDataAction = {
  type: 'REFRESH_TOKEN_DATA';
  newExpiry: number;
  data: TokenData;
};

declare type SetQuarterAction = {
  type: 'SET_QUARTER';
  quarter: number;
};

declare type UpdateCoursesAction = {
  type: 'UPDATE_COURSES';
  courses: Course[];
};

declare type SignOutAction = {
  type: 'SIGN_OUT';
};

declare type ClearStoreAction = {
  type: 'CLEAR_STORE';
};

declare type NewMessagesAction = {
  type: 'NEW_MESSAGES';
  chatId: string;
  messages: string[];
  messageMap: Messagemap;
};

declare type EditUsersAction = {
  type: 'EDIT_USERS';
  chatId: string;
  data: Usermap;
  memberIds: string[];
};

declare type SetUserAction = {
  type: 'SET_USER';
  userId: string;
  data: User;
};

declare type ActionTypes =
  | SetAuthStateAction
  | SetMyUserAction
  | JoinChatAction
  | UpdateMyUserAction
  | LeaveChatAction
  | SetTokenDataAction
  | RefreshTokenDataAction
  | SetQuarterAction
  | UpdateCoursesAction
  | SignOutAction
  | ClearStoreAction
  | NewMessagesAction
  | EditUsersAction
  | SetUserAction;

declare type Data = {
  authState: AuthState;
  myUserId: string;
  usermap: Usermap;
  chatmap: Chatmap;
  coursemap: Coursemap;
  tokenData: TokenData | null;
  quarter: number;
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

declare type TokenData = {
  accessToken: string;
  idToken: string;
};

declare type RefreshData = {
  refreshToken: string;
  expiry: number;
};

declare type Status =
  | 'reading'
  | 'sleeping'
  | 'eating'
  | 'traveling'
  | 'working_out'
  | 'music';

declare type MutableUser = {
  preferredName?: string;
  bio?: string;
  status?: Status;
  photo?: string;
  syncedCalendar?: SyncedCalendar;
};

declare type User = MutableUser & {
  email: string;
  firstName: string;
  lastName: string;
  perm: number;
  refreshData: RefreshData;
  chats?: string[];
};

declare type MessageType = 'text' | 'image' | 'video' | 'file';

declare type TextMessageContent = {
  text: string;
};
declare type MediaMessageContent = {
  url: string;
};
declare type FileMessageContent = {
  url: string;
  fileName: string;
};
declare type MessageContent =
  | TextMessageContent
  | MediaMessageContent
  | FileMessageContent;

declare type Message = {
  type: MessageType;
  content: MessageContent;
  fromUserId: string;
  createdAt: Date;
};

declare type Chat = {
  messages: string[];
  messagemap: Messagemap;
  memberIds: string[];
};

declare type Instructor = {
  name: string;
  functionCode: string;
};

declare type TimeLocation = {
  section: string;
  instructionTypeCode: string;
  days: string;
  beginTime: string;
  endTime: string;
  buildingRoom: string;
  instructors: Instructor[];
};

declare type Course = {
  courseId: string;
  quarter: string;
  enrollCode: string;
  gradingOptionCode: string;
  unitsAttempted: number;
  courseTitle: string;
  session: string | null;
  repeatTypeCode: string | null;
  timeLocations: TimeLocation[];
};

declare type SchoolEvent = {
  id: number;
  title: string;
  description: string;
  photo: string;
};

declare type SyncedCalendar = {
  quarter: number;
  calendarId: string;
};
