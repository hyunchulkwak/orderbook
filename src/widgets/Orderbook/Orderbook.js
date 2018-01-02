import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  PriceBoard,
  OrderTable,
} from './components';
import { connectSocket } from './actions';
import './Orderbook.scss';

class OrderbookBase extends Component {
  componentDidMount() {
    this.props.connectSocket();
  }

  getDepthDevisor() {
    const { asks, bids } = this.props;

    let asksTotal = 0;
    let bidsTotal = 0;

    if (asks) {
      asksTotal = asks[asks.length - 1][2];
    }

    if (bids) {
      bidsTotal = bids[bids.length - 1][2];
    }

    return asksTotal > bidsTotal ? asksTotal : bidsTotal;
  }

  render() {
    const {
      asks,
      bids,
      lastPrice,
      indexPrice,
      fairPrice,
      lastTickDirection,
      priceFormat,
    } = this.props;

    if (!asks.length || !bids.length) {
      return null;
    }

    return (
      <div className="order-book">
        {asks ?
          <OrderTable
            caption="asks"
            headerRow={['Price', 'Size', 'Total']}
            contentRows={asks.slice().reverse()}
            priceFormat={priceFormat}
            depthDevisor={this.getDepthDevisor()}
            color="#d16547"
          />
        : null}
        <PriceBoard
          lastPrice={lastPrice}
          indexPrice={indexPrice}
          fairPrice={fairPrice}
          lastTickDirection={lastTickDirection}
          priceFormat={priceFormat}
        />
        {bids ?
          <OrderTable
            caption="bids"
            headerRow={['Price', 'Size', 'Total']}
            hideHeader
            contentRows={bids}
            priceFormat={priceFormat}
            depthDevisor={this.getDepthDevisor()}
            color="#3e8654"
          />
        : null}
      </div>
    );
  }
}

OrderbookBase.defaultProps = {
  asks: [],
  bids: [],
  priceFormat: '0.0',
};

OrderbookBase.propTypes = {
  asks: PropTypes.arrayOf(PropTypes.array),
  bids: PropTypes.arrayOf(PropTypes.array),
  lastPrice: PropTypes.number.isRequired,
  indexPrice: PropTypes.number.isRequired,
  fairPrice: PropTypes.number.isRequired,
  lastTickDirection: PropTypes.string.isRequired,
  priceFormat: PropTypes.string,
};

const mapStateToProps = ({ orderbook }) => {
  const {
    asks,
    bids,
    lastPrice,
    indexPrice,
    fairPrice,
    lastTickDirection,
  } = orderbook;
  return {
    asks,
    bids,
    lastPrice,
    indexPrice,
    fairPrice,
    lastTickDirection,
  };
};

const Orderbook = connect(mapStateToProps, { connectSocket })(OrderbookBase)

export {
  Orderbook,
  OrderbookBase,
};
