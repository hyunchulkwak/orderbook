import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import { TickDirection } from './TickDirection';
import './PriceBoard.scss';

const PriceBoard = ({ lastPrice, indexPrice, fairPrice, lastTickDirection, priceFormat }) => (
  <div className="price-board">
    <div className="price-board__pane">
      <strong className={`price-board__last-price ${lastTickDirection || ''}`.trim()}>
        <span className="_last">
          {numeral(lastPrice).format(priceFormat)}
        </span>
        <TickDirection lastTickDirection={lastTickDirection} />
      </strong>
    </div>
    <div className="price-board__pane">
      <span className="price-board__index-price _index">{numeral(indexPrice).format(priceFormat)}</span>
      <span className="price-board__slash">/</span>
      <span className="price-board__fair-price _fair">{numeral(fairPrice).format(priceFormat)}</span>
    </div>
  </div>
);

PriceBoard.defaultProps = {
  priceFormat: '0.0',
};

PriceBoard.propTypes = {
  lastPrice: PropTypes.number.isRequired,
  indexPrice: PropTypes.number.isRequired,
  fairPrice: PropTypes.number.isRequired,
  lastTickDirection: PropTypes.string.isRequired,
  priceFormat: PropTypes.string,
};

export { PriceBoard };
