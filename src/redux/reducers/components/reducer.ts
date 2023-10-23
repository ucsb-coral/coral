function initializeState(): Data {
  return {
    reduxTest: false,
    user: null,
  };
}

export function reducer(
  state: Data = initializeState(),
  action: ActionTypes,
): Data {
  switch (action.type) {
    case 'SET_REDUX_TEST':
      return {...state, reduxTest: action.reduxTest};
    default:
      return state;
  }
}
