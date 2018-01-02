import { types } from './actions';

const initialState = {
  status: types.SOCKET_CLOSED,
  symbol: 'XBTUSD',
  lastPrice: 0,
  indexPrice: 0,
  fairPrice: 0,
  lastTickDirection: '',
  asks: [],
  bids: [],
};

const orderbook = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SOCKET_CONNECTED:
    case types.SOCKET_CLOSED:
    case types.SOCKET_ERROR:
      return {
        ...state,
        status: type,
      };
    case types.ORDER_UPDATED:
      return {
        ...state,
        asks: payload.asks,
        bids: payload.bids,
      };
    case types.INSTRUMENT_UPDATED:
      return {
        ...state,
        lastPrice: payload.lastPrice || state.lastPrice,
        indexPrice: payload.indicativeSettlePrice || state.indexPrice,
        fairPrice: payload.fairPrice || state.fairPrice,
        lastTickDirection: payload.lastTickDirection || state.lastTickDirection,
      };
    default:
      return state;
  }
};

export { orderbook };
