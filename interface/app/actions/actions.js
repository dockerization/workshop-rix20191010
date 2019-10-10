import * as types from '../constants/ActionTypes.js';
import $ from 'jquery';

/**
 * Request products action
 * @return {object} plain object with action type
 */
export function requestProducts() {
  return {
    type: types.REQUEST_PRODUCTS,
  };
}

/**
 * Receive products action
 * @param  {object} json JSON with product list
 * @return {object}      plain object with type and product list
 */
export function receiveProducts(json) {
  return {
    type: types.RECEIVE_PRODUCTS,
    products: json.products
  };
}

/**
 * Fetch list of products action
 * @return {promise} after ajax call
 */
export function fetchProducts() {
  return dispatch => {
    dispatch(requestProducts());
    return $.ajax({
      url: '/api/product_list',
      dataType: 'json',
      cache: false,
      success: function (data) {
        dispatch(receiveProducts(data));
      }
    });
  }
}

/**
 * Select item action
 * @param  {integer} id selected item identifier
 * @return {object}    plain object with action type and id
 */
export function selectItem(id) {
  return {
    type: types.SELECT_ITEM,
    id
  };
}

/**
 * Enable *buy* button action
 * @return {object} plain object with action type
 */
export function enableBuyButton() {
  return {
    type: types.ENABLE_BUY_BUTTON
  };
}

/**
 * Disable *buy* button action
 * @return {object} plain object with action type
 */
export function disableBuyButton() {
  return {
    type: types.DISABLE_BUY_BUTTON
  };
}

/**
 * Send cash action
 * @param  {float} amount amount to send into vendig machine
 * @return {object}        plain object with action type and amount
 */
export function sendCash(amount) {
  return {
    type: types.SEND_CASH,
    amount
  };
}

/**
 * Receive cash action
 * @param  {float} amount received amount
 * @return {object}        plain object with action type and amount
 */
export function receiveCash(amount) {
  return {
    type: types.RECEIVE_CASH,
    amount
  }
}

/**
 * Request cash action
 * @param  {float} amount cash to send in to vending machine
 * @return {promise}        after ajax call
 */
export function requestCash(amount) {
  return dispatch => {
    dispatch(sendCash(amount));
    return $.ajax({
      url: '/api/balance_refill',
      method: "POST",
      data: JSON.stringify({credit: parseFloat(amount)}),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        dispatch(receiveCash(Math.round(data.credit * 100) / 100));
      }
    });
  }
}

/**
 * Receive message action
 * @param  {string} message received message from ajax call or something else to display
 * @return {object}         plain object with action type and message
 */
export function receiveMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message
  };
}

/**
 * But selected item action
 * @return {object} plain object with action type
 */
export function buySelectedItem() {
  return {
    type: types.BUY_SELECTED_ITEM
  };
}

/**
 * Purchase request action
 * @param  {integer} id             identifier of selected item
 * @param  {string} type           =             'cash' type of transaction to hold
 * @param  {object} paymentDetails =             {}     additional data for sucessful transactions
 * @return {promise}                from ajax request
 */
export function requestBuy(id, type = 'cash', paymentDetails = {}) {
  return dispatch => {
    dispatch(buySelectedItem(id));
    return $.ajax({
      url: '/api/purchase',
      method: 'POST',
      data: JSON.stringify({slot: id, payment: type, payment_details: paymentDetails}),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function (data) {
        let credit = Math.round(data.credit * 100) / 100;
        if (type == 'cash') {
          dispatch(receiveCash(Math.round(data.credit * 100) / 100));
        }
        dispatch(receiveMessage(data.result));
      }
    });
  }
}

/**
 * Add credit card action
 * @param  {string} ccnum credit card number
 * @return {object}      plain object with action type and credit card number
 */
export function addCreditCard(ccnum) {
  return {
    type: types.ADD_CREDIT_CARD,
    ccnum
  };
}

/**
 * Add card PIN action
 * @param  {string} pin pin of credit card
 * @return {object}     plain object with action type and card PIN
 */
export function addCardPin(pin) {
  return {
    type: types.ADD_CARD_PIN,
    pin
  };
}
