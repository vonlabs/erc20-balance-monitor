import React from 'react';
import renderer from 'react-test-renderer';
import Table from "./index";

const addres = [{
  "uuid": "d49d2cbb-9320-42ce-b234-83b6f15579c2",
  "coin": "LINK",
  "address": "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"
}]

const addreses = [{
  "uuid": "d49d2cbb-9320-42ce-b234-83b6f15579c1",
  "coin": "LINK",
  "address": "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1"
},{
  "uuid": "d49d2cbb-9320-42ce-b234-83b6f15579c2",
  "coin": "ETH",
  "address": "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c2"
},{
  "uuid": "d49d2cbb-9320-42ce-b234-83b6f15579c3",
  "coin": "LINK",
  "address": "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c3"
}]

const balances = {
  "d49d2cbb-9320-42ce-b234-83b6f15579c1": "0123",
  "d49d2cbb-9320-42ce-b234-83b6f15579c2": "4567",
  "d49d2cbb-9320-42ce-b234-83b6f15579c3": "8901"
}

it('Table renders correctly empty table', () => {
  const tree = renderer
    .create(<Table
      addresses={[]}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Table renders correctly table with 1 item', () => {
  const tree = renderer
    .create(<Table
      addresses={addres}
      balances={balances}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Table renders correctly table with multiple item', () => {
  const tree = renderer
    .create(<Table
      addresses={addreses}
      balances={balances}
    />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
