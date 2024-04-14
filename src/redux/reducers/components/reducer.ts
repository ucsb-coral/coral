import {generateCourseId} from '../../../firebaseReduxUtilities/useCourseData';

const initialData: Data = {
  authState: 'NONE',
  myUserId: '',
  usermap: {},
  likes: {},
  chatmap: {},
  coursemap: {},
  tokenData: null,
  quarter: 0,
  events: {}
};

function initializeState(): Data {
  return initialData;
}

export function reducer(
  state: Data = initializeState(),
  action: ActionTypes,
): Data {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      return {...state, authState: action.authState};
    case 'SET_MY_USER': {
      const {id, data} = action;
      const usermap = state.usermap;
      usermap[id] = {...usermap[id], ...data};
      return {...state, myUserId: id, usermap: {...usermap}};
    }
    case 'SET_USER_LIKES': {
      const {data} = action;
      return {...state, likes: data};
    }
    case 'UPDATE_MY_USER': {
      const {data} = action;
      const myUserId = state.myUserId;
      const usermap = state.usermap;
      usermap[myUserId] = {...usermap[myUserId], ...data};
      return {...state, usermap: {...usermap}};
    }
    case 'JOIN_CHAT': {
      const {id} = action;
      const myUserId = state.myUserId;
      const usermap = {...state.usermap};
      const myUser = {...usermap[myUserId!]};
      myUser.chats = [...(myUser.chats ?? [])];
      myUser.chats.push(id);
      return {
        ...state,
        usermap: {
          ...state.usermap,
          [myUserId!]: {...state.usermap[myUserId!], ...myUser},
        },
      };
    }
    case 'LEAVE_CHAT': {
      const {id} = action;
      const myUserId = state.myUserId;
      const chatmap = {...state.chatmap};
      delete chatmap[id];
      const usermap = {...state.usermap};
      const myUser = usermap[myUserId!];
      usermap[myUserId].chats = myUser.chats?.filter(chatId => chatId !== id);
      return {
        ...state,
        usermap,
        chatmap,
      };
    }
    case 'SET_TOKEN_DATA': {
      return {
        ...state,
        tokenData: action.data,
      };
    }
    case 'REFRESH_TOKEN_DATA': {
      const myUser = {...state.usermap[state.myUserId!]};
      myUser.refreshData.expiry = action.newExpiry;
      state.usermap[state.myUserId!] = myUser;
      state.tokenData = action.data;
      return {
        ...state,
      };
    }
    case 'UPDATE_COURSES': {
      const {courses} = action;
      const coursemap: Coursemap = {};
      courses.forEach(course => {
        var {courseId, session} = course;
        const id = generateCourseId(courseId, session);
        coursemap[id] = course;
        coursemap[id].courseId = courseId.replace(/\s+/g, ' ').trim();
      });
      const myUser = {...state.usermap[state.myUserId!]};
      const myChats = myUser.chats;
      const myNewChats: string[] = [];
      if (myChats) {
        myChats.forEach(chatId => {
          if (!coursemap[chatId]) delete state.chatmap[chatId];
          else myNewChats.push(chatId);
        });
        myUser.chats = myNewChats;
      }

      return {
        ...state,
        coursemap: coursemap,
        chatmap: {...state.chatmap},
        usermap: {
          ...state.usermap,
          [state.myUserId!]: myUser,
        },

        // quarter: action,
      };
    }
    case 'SET_QUARTER': {
      return {
        ...state,
        quarter: action.quarter,
      };
    }
    case 'SIGN_OUT': {
      return {...initialData};
    }
    case 'CLEAR_STORE': {
      return {
        ...initialData,
      };
    }
    case 'NEW_MESSAGES': {
      const {chatId, messageMap, messages} = action;
      return {
        ...state,
        chatmap: {
          ...state.chatmap,
          [chatId]: {
            ...state.chatmap[chatId],
            messagemap: {...messageMap},
            messages: [...messages],
          },
        },
      };
    }
    case 'EDIT_USERS': {
      const {chatId, data, memberIds} = action;
      return {
        ...state,
        chatmap: {
          ...state.chatmap,
          [chatId]: {
            ...state.chatmap[chatId],
            memberIds: [...memberIds],
          },
        },
        usermap: {
          ...state.usermap,
          ...data,
        },
      };
    }
    case 'SET_USER': {
      const {userId, data} = action;
      return {
        ...state,
        usermap: {
          ...state.usermap,
          [userId]: {
            ...data,
          },
        },
      };
    }
    case 'SET_EVENT':
      const {eventID, data} = action;
      return {
        ...state,
        events: {
          ...state.events,
          [eventID]: {
            ...data,
          }
        }
      };
    default:
      return state;
  }
}
