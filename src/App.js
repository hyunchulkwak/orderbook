import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
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

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Orderbook priceFormat="0.0" />
          <button type="button" onClick={() => store.dispatch({ type: 'CONNECT_SOCKET' })}>run!</button>
          <button type="button" onClick={() => store.dispatch({ type: 'CLOSE_SOCKET' })}>stop!</button>
        </div>
      </Provider>
    );
  }
}

export default App;
