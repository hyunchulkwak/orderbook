import { combineReducers } from 'redux';
import { orderbook } from '../widgets/Orderbook/reducer';

const reducer = combineReducers({
  orderbook,
});

export { reducer };
