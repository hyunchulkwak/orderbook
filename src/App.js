import React, { Component } from 'react';
import { Orderbook } from './widgets';
import './App.scss';

class App extends Component {
  state = {
    symbol: '',
    lastPrice: 0,
    indexPrice: 0,
    fairPrice: 0,
    lastTickDirection: '',
    asks: [],
    bids: [],
  };

  componentDidMount() {
    const socket = new WebSocket('wss://www.bitmex.com/realtime?subscribe=instrument:XBTUSD,orderBook10:XBTUSD');

    socket.onmessage = (event) => {
      const { action, table, data } = JSON.parse(event.data);
      const isUpdateNeeded = action === "partial" || action === "update";

      if (isUpdateNeeded && table === "instrument") {
        const [{ lastPrice, indicativeSettlePrice, fairPrice, lastTickDirection }] = data;
        this.setState({
          lastPrice: lastPrice || this.state.lastPrice,
          indexPrice: indicativeSettlePrice || this.state.indexPrice,
          fairPrice: fairPrice || this.state.fairPrice,
          lastTickDirection: lastTickDirection || this.state.lastTickDirection,
        });
      }

      if (isUpdateNeeded && table === "orderBook10") {
        const [{ symbol, asks, bids }] = data;
        this.setState({
          symbol,
          asks: this.accumulateOrders(asks),
          bids: this.accumulateOrders(bids),
        });
      }
    };
  }

  accumulateOrders(orders, isReversed = false) {
    return orders.reduce((results, [price, size], index) => {
      let total = 0;

      if (index > 0) {
        total = results[index - 1][2];
      }

      const order = [price, size, total + size];
      
      return isReversed
        ? [ order, ...results ]
        : [ ...results, order ];
    }, []);
  }

  render() {
    const { lastPrice, indexPrice, fairPrice, lastTickDirection, symbol, asks, bids } = this.state;

    return (
      <div className="App">
        {symbol ?
          <Orderbook
            asks={asks}
            bids={bids}
            lastPrice={lastPrice}
            indexPrice={indexPrice}
            fairPrice={fairPrice}
            lastTickDirection={lastTickDirection}
            priceFormat="0.0"
          />
        : null}
      </div>
    );
  }
}

export default App;
