import {ActionCreator} from 'redux';

const setReduxTestAction: ActionCreator<SetReduxTestAction> = (
  reduxTest: boolean,
) => {
  return {
    type: 'SET_REDUX_TEST',
    reduxTest,
  };
};

export {setReduxTestAction};
