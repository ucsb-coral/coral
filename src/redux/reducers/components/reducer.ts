import {generateCourseId} from '../../../firebaseReduxUtilities/useCourseData';

const initialData: Data = {
  authState: 'NONE',
  myUserId: '',
  usermap: {},
  chatmap: {},
  coursemap: {},
  tokenData: null,
  quarter: 0,
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
      const {id, user} = action;
      const usermap = state.usermap;
      usermap[id] = {...usermap[id], ...user};
      return {...state, myUserId: id, usermap: {...usermap}};
    }
    case 'JOIN_CHAT': {
      const {id, chat} = action;
      const myUserId = state.myUserId;
      const chatmap = state.chatmap;
      const usermap = state.usermap;
      const myUser = usermap[myUserId!];
      if (!myUser.chats) myUser.chats = [];
      chatmap[id] = chat;
      return {
        ...state,
        chatmap: {...chatmap},
        usermap: {
          ...usermap,
          [myUserId!]: {
            ...myUser,
            chats: [...myUser.chats, id],
          },
        },
      };
    }
    case 'SET_CHATS': {
      const {chatmap} = action;
      return {
        ...state,
        chatmap: {...state.chatmap, ...chatmap},
      };
    }
    case 'LOAD_COURSES': {
      const {coursemap} = action;
      return {
        ...state,
        coursemap: {...state.coursemap, ...coursemap},
      };
    }
    case 'JOIN_COURSE': {
      const {id, course} = action;
      const myUserId = state.myUserId;
      const coursemap = state.coursemap;
      const usermap = state.usermap;
      const myUser = usermap[myUserId!];
      if (!myUser.courses) {
        myUser.courses = [];
      } else if (!myUser.courses.includes(id)) {
        myUser.courses = [...myUser.courses, id];
      }
      const newCourses = myUser.courses;
      return {
        ...state,
        usermap: {
          ...usermap,
          [myUserId!]: {
            ...myUser,
            courses: newCourses,
          },
        },
        coursemap: {...coursemap, [id]: course},
      };
    }
    case 'LEAVE_COURSE': {
      const {id, course} = action;
      const myUserId = state.myUserId;
      const coursemap = state.coursemap;
      const usermap = state.usermap;
      const myUser = usermap[myUserId!];
      const newCourses = myUser.courses?.filter(courseId => courseId !== id);
      return {
        ...state,
        usermap: {
          ...usermap,
          [myUserId!]: {
            ...myUser,
            courses: newCourses,
          },
        },
        coursemap: {...coursemap, [id]: course},
      };
    }
    case 'LEAVE_CHAT': {
      const {id, chat} = action;
      const myUserId = state.myUserId;
      const chatmap = state.chatmap;
      const usermap = state.usermap;
      const myUser = usermap[myUserId!];
      const newChats = myUser.chats?.filter(chatId => chatId !== id);
      return {
        ...state,
        usermap: {
          ...usermap,
          [myUserId!]: {
            ...myUser,
            chats: newChats,
          },
        },
        chatmap: {...chatmap, [id]: chat},
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
      return {
        ...state,
        authState: 'NONE',
        myUserId: '',
      };
    }
    case 'CLEAR_STORE': {
      return {
        ...initialData,
      };
    }
    default:
      return state;
  }
}
