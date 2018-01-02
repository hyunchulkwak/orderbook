import React from 'react';
import { mount } from 'enzyme';
import { OrderTable } from './OrderTable';

test('renders headerRow correctly', () => {
  const headerRow = ['Price', 'Size', 'Total'];
  const wrapper = mount(
    <OrderTable
      caption="asks"
      priceForm="0.0"
      depthDevisor={100}
      color="#f00"
      headerRow={headerRow}
      contentRows={[
        [105, 30, 51],
        [103, 20, 21],
        [100, 1, 1]
      ]}
    />
  );

  expect(
    wrapper.find('thead th').length
  ).toBe(headerRow.length);
  expect(
    wrapper.find('thead th').at(0).text()
  ).toBe(headerRow[0]);
  expect(
    wrapper.find('thead th').at(1).text()
  ).toBe(headerRow[1]);
  expect(
    wrapper.find('thead th').at(2).text()
  ).toBe(headerRow[2]);
});

test('renders price according to its prop priceFormat', () => {
  const wrapper = mount(
    <OrderTable
      caption="asks"
      priceForm="0.0"
      depthDevisor={100}
      color="#f00"
      headerRow={['Price', 'Size', 'Total']}
      contentRows={[
        [0.1051, 30, 51],
        [0.103, 20, 21],
        [0.1001, 1, 1]
      ]}
      priceFormat="0.0000"
    />
  );

  expect(
    wrapper.find('tbody tr').at(0).find('td button').at(0).text()
  ).toBe('0.1051');
  expect(
    wrapper.find('tbody tr').at(1).find('td button').at(0).text()
  ).toBe('0.1030');
  expect(
    wrapper.find('tbody tr').at(2).find('td button').at(0).text()
  ).toBe('0.1001');
});

test('renders depth according to its props depthDevisor and color', () => {
  const depthDevisor = 100;
  const contentRows = [
    [0.1051, 30, 51],
    [0.103, 20, 21],
    [0.1001, 1, 1]
  ];
  const color = '#f00';
  const wrapper = mount(
    <OrderTable
      caption="asks"
      priceForm="0.0"
      depthDevisor={depthDevisor}
      color={color}
      headerRow={['Price', 'Size', 'Total']}
      contentRows={contentRows}
      priceFormat="0.0000"
    />
  );

  const getWidth = depth => (depth / depthDevisor * 100) + '%';

  expect(
    wrapper.find('tbody tr').at(0).find('td .depth').get(0).props.style
  )
  .toMatchObject({
    width: getWidth(contentRows[0][2]),
    background: color,
  });
  
  expect(
    wrapper.find('tbody tr').at(1).find('td .depth').get(0).props.style
  )
  .toMatchObject({
    width: getWidth(contentRows[1][2]),
    background: color,
  });
  
  expect(
    wrapper.find('tbody tr').at(2).find('td .depth').get(0).props.style
  )
  .toMatchObject({
    width: getWidth(contentRows[2][2]),
    background: color,
  });
});
