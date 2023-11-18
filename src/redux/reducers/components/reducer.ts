const initialData: Data = {
  authState: 'NONE',
  myUserId: '',
  usermap: {},
  chatmap: {},
  coursemap: {},
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
      usermap[id] = user;
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
            chats: [...myUser.chats, id]}},
      };
    }
    case 'SET_CHATS': {
      const {chatmap} = action;
      return {
        ...state,
        chatmap: {...state.chatmap, ...chatmap},
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
