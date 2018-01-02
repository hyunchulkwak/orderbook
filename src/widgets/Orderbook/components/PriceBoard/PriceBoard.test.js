import React from 'react';
import { mount } from 'enzyme';
import { PriceBoard } from './PriceBoard';

test('renders decimal numbers when USD values are set', () => {
  const lastPrice = 13000;
  const indexPrice = 13000.5;
  const fairPrice = 13001;
  const wrapper = mount(
    <PriceBoard
      lastPrice={lastPrice}
      indexPrice={indexPrice}
      fairPrice={fairPrice}
      lastTickDirection="PlusTick"
    />
  );

  expect(
    wrapper.find('._last').text()
  ).toBe('13000.0');
  expect(
    wrapper.find('._index').text()
  ).toBe('13000.5');
  expect(
    wrapper.find('._fair').text()
  ).toBe('13001.0');
});

test('renders decimal numbers according to its prop priceFormat', () => {
  const lastPrice = 0.1834;
  const indexPrice = 0.1772;
  const fairPrice = 0.184;
  const priceFormat = '0.0000';
  const wrapper = mount(
    <PriceBoard
      lastPrice={lastPrice}
      indexPrice={indexPrice}
      fairPrice={fairPrice}
      priceFormat={priceFormat}
      lastTickDirection="PlusTick"
    />
  );

  expect(
    wrapper.find('._last').text()
  ).toBe('0.1834');
  expect(
    wrapper.find('._index').text()
  ).toBe('0.1772');
  expect(
    wrapper.find('._fair').text()
  ).toBe('0.1840');
});

test('renders last price with its prop lastTickDirection', () => {
  const lastTickDirection = 'PlusTick';
  const wrapper = mount(
    <PriceBoard
      lastPrice={100}
      indexPrice={100}
      fairPrice={100}
      lastTickDirection={lastTickDirection}
    />
  );

  expect(
    wrapper.find('.price-board__last-price').hasClass(lastTickDirection)
  ).toBe(true);
});
