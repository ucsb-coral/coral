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

const joinChatAction: Action<JoinChatAction> = props => {
  return {
    type: 'JOIN_CHAT',
    ...props,
  };
};

const setChatsAction: Action<SetChatsAction> = props => {
  return {
    type: 'SET_CHATS',
    ...props,
  };
};

const loadCoursesAction: Action<LoadCoursesAction> = props => {
  return {
    type: 'LOAD_COURSES',
    ...props,
  };
};

const joinCourseAction: Action<JoinCourseAction> = props => {
  return {
    type: 'JOIN_COURSE',
    ...props,
  };
};

const leaveCourseAction: Action<LeaveCourseAction> = props => {
  return {
    type: 'LEAVE_COURSE',
    ...props,
  };
};
const leaveChatAction: Action<LeaveChatAction> = props => {
  return {
    type: 'LEAVE_CHAT',
    ...props,
  };
};

const setTokenDataAction: Action<SetTokenDataAction> = props => {
  return {
    type: 'SET_TOKEN_DATA',
    ...props,
  };
};

const refreshTokenDataAction: Action<RefreshTokenDataAction> = props => {
  return {
    type: 'REFRESH_TOKEN_DATA',
    ...props,
  };
};

const updateCoursesAction: Action<UpdateCoursesAction> = props => {
  return {
    type: 'UPDATE_COURSES',
    ...props,
  };
};

const setQuarterAction: Action<SetQuarterAction> = props => {
  return {
    type: 'SET_QUARTER',
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

export {
  setAuthStateAction,
  setMyUserAction,
  joinChatAction,
  setChatsAction,
  loadCoursesAction,
  joinCourseAction,
  leaveCourseAction,
  leaveChatAction,
  setTokenDataAction,
  refreshTokenDataAction,
  updateCoursesAction,
  setQuarterAction,
  signOutAction,
  clearStoreAction,
};
