import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';
import './OrderTable.scss';

const OrderTable = ({ caption, priceFormat, depthDevisor, color, headerRow, contentRows, hideHeader }) => (
  <table className="order-table">
    <caption>{caption}</caption>
    {headerRow ?
      <thead className={hideHeader ? 'is-hide' : ''}>
        <tr>
          {headerRow.map(name => <th key={name} scope="col">{name}</th>)}
        </tr>
      </thead>
    : null}
    <tbody style={{ color }}>
      {contentRows.map(([price, size, total], index) => {
        const depth = total / depthDevisor * 100 + '%';
        return (
          <tr key={index}>
            <td>
              <button type="button" style={{ color }}>{numeral(price).format(priceFormat)}</button>
            </td>
            <td>
              <button type="button">{numeral(size).format('0,0')}</button>
            </td>
            <td>
              <button type="button">{numeral(total).format('0,0')}</button>
              <div className="depth" style={{ width: depth, background: color }}>
                <span>{depth}</span>
              </div>
            </td>
          </tr>
        )
      })}
    </tbody>
  </table>
);

OrderTable.defaultProps = {
  priceFormat: '0.0',
  hideHeader: false,
};

OrderTable.propTypes = {
  caption: PropTypes.string.isRequired,
  priceFormat: PropTypes.string,
  depthDevisor: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  headerRow: PropTypes.arrayOf(PropTypes.string),
  contentRows: PropTypes.arrayOf(PropTypes.array).isRequired,
  hideHeader: PropTypes.bool,
};

export { OrderTable };
