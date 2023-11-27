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
}

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
  signOutAction,
  clearStoreAction,
};
