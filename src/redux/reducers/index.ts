import {combineReducers} from 'redux';
import {reducer} from './components/reducer';

export const rootReducer = combineReducers<ReduxState>({
  data: reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
