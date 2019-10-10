import expect from 'expect';
import * as actions from '../app/actions/actions.js';
import * as types from '../app/constants/ActionTypes.js';

describe('Actions', () => {
  it('should create an action to request products', () => {
    const expectedAction = {
      type: types.REQUEST_PRODUCTS
    };
    expect(actions.requestProducts()).toEqual(expectedAction);
  });

  it('should create an action to receive list of products', () => {
    const listOfProducts = {products: [{slot: 0, count: 10, price: 0.8, name: "snickers"}]};
    const expectedAction = {
      type: types.RECEIVE_PRODUCTS,
      products: listOfProducts.products
    };
    expect(actions.receiveProducts(listOfProducts)).toEqual(expectedAction);
  });

  it('should create an action to save selected item ID', () => {
    const id = 1;
    const expectedAction = {
      type: types.SELECT_ITEM,
      id
    };
    expect(actions.selectItem(id)).toEqual(expectedAction);
  });

  it('should create an action to enable buy button', () => {
    const expectedAction = {
      type: types.ENABLE_BUY_BUTTON
    };
    expect(actions.enableBuyButton()).toEqual(expectedAction);
  });

  it('should create an action to disable buy button', () => {
    const expectedAction = {
      type: types.DISABLE_BUY_BUTTON
    };
    expect(actions.disableBuyButton()).toEqual(expectedAction);
  });

  it('should create an action to send cash', () => {
    const amount = 1.55;
    const expectedAction = {
      type: types.SEND_CASH,
      amount
    };
    expect(actions.sendCash(amount)).toEqual(expectedAction);
  });

  it('should create an action to receive cash', () => {
    const amount = 1.55;
    const expectedAction = {
      type: types.RECEIVE_CASH,
      amount
    };
    expect(actions.receiveCash(amount)).toEqual(expectedAction);
  });

  it('should create an action to receive message', () => {
    const message = 'SUCCESS!';
    const expectedAction = {
      type: types.RECEIVE_MESSAGE,
      message
    };
    expect(actions.receiveMessage(message)).toEqual(expectedAction);
  });

  it('should create an action to buy selected item', () => {
    const expectedAction = {
      type: types.BUY_SELECTED_ITEM,
    };
    expect(actions.buySelectedItem()).toEqual(expectedAction);
  });

  it('should create an action to add credit card', () => {
    const ccnum = '1234567891234568';
    const expectedAction = {
      type: types.ADD_CREDIT_CARD,
      ccnum
    };
    expect(actions.addCreditCard(ccnum)).toEqual(expectedAction);
  });

  it('should create an action to add PIN number', () => {
    const pin = '3000';
    const expectedAction = {
      type: types.ADD_CARD_PIN,
      pin
    };
    expect(actions.addCardPin(pin)).toEqual(expectedAction);
  });
});
