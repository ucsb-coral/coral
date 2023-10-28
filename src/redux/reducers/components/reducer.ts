function initializeState(): Data {
  return {
    authState: 'NONE',
    googleUser: null,
    user: null,
  };
}

export function reducer(
  state: Data = initializeState(),
  action: ActionTypes,
): Data {
  switch (action.type) {
    case 'SET_AUTH_STATE':
      return {...state, authState: action.authState};
    case 'SET_GOOGLE_USER':
      return {...state, googleUser: action.googleUser};
    default:
      return state;
  }
}
