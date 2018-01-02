import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { reducer } from './reducer';
import { epic } from './epic';

const epicMiddleware = createEpicMiddleware(epic);

const store = createStore(
  reducer,
  applyMiddleware(epicMiddleware),
);

export { store };
