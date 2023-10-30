const initialData: Data = {
  authState: 'NONE',
  myUserId: null,
  usermap: {},
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
      const {usermap} = state;
      usermap[id] = user;
      return {...state, myUserId: id, usermap: {...usermap}};
    }
    case 'SIGN_OUT': {
      return {
        ...state,
        authState: 'NONE',
        myUserId: null,
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
