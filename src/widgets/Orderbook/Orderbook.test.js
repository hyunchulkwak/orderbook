import React from 'react';
import { mount } from 'enzyme';
import { OrderbookBase } from './Orderbook';

test('getDepthDevisor returns the highest total of asks and bids', () => {
  // assume asks and bids are sorted by price in ascending order
  const asks = [
    [100, 1, 1],
    [103, 20, 21],
    [105, 30, 51],
  ];
  const bids = [
    [91, 3, 3],
    [95, 7, 10],
    [99, 90, 100],
  ];
  const mockFn = jest.fn();
  const wrapper = mount(
    <OrderbookBase
      asks={asks}
      bids={bids}
      lastPrice={99}
      indexPrice={101}
      fairPrice={102}
      lastTickDirection="PlusTick"
      connectSocket={mockFn}
    />
  );

  expect(
    wrapper.instance().getDepthDevisor()
  ).toBe(bids[2][2]); // 100
});
