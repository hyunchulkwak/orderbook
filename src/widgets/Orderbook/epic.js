import { Observable } from 'rxjs';
import { types } from './actions';

const accumulateOrders = (orders) => {
  return orders.reduce((results, [price, size], index) => {
    let total = 0;

    if (index > 0) {
      total = results[index - 1][2];
    }

    const order = [price, size, total + size];
    
    return [ ...results, order ];
  }, []);
};

const orderbookEpic = (action$, store) => action$
  .ofType(types.CONNECT_SOCKET)
  .mergeMap(action => {
    const { orderbook } = store.getState();
    const { symbol } = orderbook;

    return Observable.webSocket({
      url: `wss://www.bitmex.com/realtime?subscribe=instrument:${symbol},orderBook10:${symbol}`
    })
    .retryWhen(err => {
      if (window.navigator.onLine) {
        return Observable.timer(1000);
      } else {
        return Observable.fromEvent(window, 'online');
      }
    })
    .takeUntil(
      action$.ofType(types.CLOSE_SOCKET)
    );
  })
  .map(({ action, table, data }) => {
    const isUpdateNeeded = action === "partial" || action === "update";

    if (isUpdateNeeded && table === 'instrument') {
      return {
        type: types.INSTRUMENT_UPDATED,
        payload: data[0],
      };
    }

    if (isUpdateNeeded && table === 'orderBook10') {
      return {
        type: types.ORDER_UPDATED,
        payload: {
          asks: accumulateOrders(data[0].asks),
          bids: accumulateOrders(data[0].bids),
        }
      };
    }

    return {
      type: types.OTHERS_UPDATED
    };
  });
  
export { orderbookEpic };
