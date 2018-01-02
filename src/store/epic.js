import { combineEpics } from 'redux-observable';
import { orderbookEpic } from '../widgets/Orderbook/epic';

const epic = combineEpics(
  orderbookEpic,
);

export { epic };
