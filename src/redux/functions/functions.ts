import {setReduxTestAction} from '../actions';
import {store} from '../useRedux';

const getReduxTest = () => store.getState().data;
const setReduxTest = (reduxTest: boolean) =>
  store.dispatch(setReduxTestAction(reduxTest));
const toggleReduxTest = () => setReduxTest(!getReduxTest());
export {getReduxTest, setReduxTest, toggleReduxTest};
