import expect from 'expect';
import reducer from '../app/reducers/reducers.js';
import * as types from '../app/constants/ActionTypes.js';

describe('Reducers', () => {
  it('should handle RECEIVE_PRODUCTS', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      activeCredit: 0,
      ccnum: '',
      isBuyButtonEnabled: false,
      message: '',
      pin: '',
      products: [],
      selectedItemId: 0
    });
  });

  it('should handle ENABLE_BUY_BUTTON', () => {
    expect(
      reducer({isBuyButtonEnabled: false}, {
        type: types.ENABLE_BUY_BUTTON,
        true
      })
    ).toEqual({
      activeCredit: 0,
      ccnum: '',
      isBuyButtonEnabled: true,
      message: '',
      pin: '',
      products: [],
      selectedItemId: 0
    });
  });

  it('should handle DISABLE_BUY_BUTTON', () => {
    expect(
      reducer({isBuyButtonEnabled: true}, {
        type: types.DISABLE_BUY_BUTTON,
        false
      })
    ).toEqual({
      activeCredit: 0,
      ccnum: '',
      isBuyButtonEnabled: false,
      message: '',
      pin: '',
      products: [],
      selectedItemId: 0
    });
  });

  it('should handle RECEIVE_CASH', () => {
    expect(
      reducer({activeCredit: 0}, {
        type: types.RECEIVE_CASH,
        amount: 0.5
      })
    ).toEqual({
      activeCredit: 0.5,
      ccnum: '',
      isBuyButtonEnabled: false,
      message: '',
      pin: '',
      products: [],
      selectedItemId: 0
    });
  });

  it('should handle RECEIVE_MESSAGE', () => {
    expect(
      reducer({message: ''}, {
        type: types.RECEIVE_MESSAGE,
        message: 'hello'
      })
    ).toEqual({
      activeCredit: 0,
      ccnum: '',
      isBuyButtonEnabled: false,
      message: 'hello',
      pin: '',
      products: [],
      selectedItemId: 0
    });
  });

  it('should handle ADD_CREDIT_CARD', () => {
    expect(
      reducer({ccnum: ''}, {
        type: types.ADD_CREDIT_CARD,
        ccnum: '1234567891234567'
      })
    ).toEqual({
      activeCredit: 0,
      ccnum: '1234567891234567',
      isBuyButtonEnabled: false,
      message: '',
      pin: '',
      products: [],
      selectedItemId: 0
    });
  });

  it('should handle ADD_CARD_PIN', () => {
    expect(
      reducer({ccnum: ''}, {
        type: types.ADD_CARD_PIN,
        pin: '3000'
      })
    ).toEqual({
      activeCredit: 0,
      ccnum: '',
      isBuyButtonEnabled: false,
      message: '',
      pin: '3000',
      products: [],
      selectedItemId: 0
    });
  });

});
