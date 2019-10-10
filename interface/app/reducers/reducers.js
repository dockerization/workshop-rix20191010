import { combineReducers } from 'redux';
import * as types from '../constants/ActionTypes.js';

/**
 * Products reducer which is responsible to store product list
 * @param  {array} state  =             [] list of products
 * @param  {object} action action object
 * @return {array}        return list of products to state
 */
function products(state = [], action) {
  switch (action.type) {
    case types.RECEIVE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}

/**
 * Selected item id reducer which is responsible to store selected item id
 * @param  {integer} state  =             0 identifier of the seleceted item
 * @param  {object} action action object
 * @return {integer}        return selected item identifier
 */
function selectedItemId(state = 0, action) {
  switch (action.type) {
    case types.SELECT_ITEM:
      return action.id;
    default:
      return state;
  }
}

/**
 * Reducer that stores the state of buy button
 * @param  {boolean}  state  =             false store button state
 * @param  {object}  action action object
 * @return {boolean}        return state of buy button
 */
function isBuyButtonEnabled(state = false, action) {
  switch (action.type) {
    case types.ENABLE_BUY_BUTTON:
      return true;
    case types.DISABLE_BUY_BUTTON:
      return false;
    default:
      return state;
  }
}

/**
 * Reducer that store active credit amount
 * @param  {float} state  =             0 cash amount
 * @param  {object} action action object
 * @return {float}        return actual amount of credit
 */
function activeCredit(state = 0, action) {
  switch (action.type) {
    case types.RECEIVE_CASH:
      return action.amount;
    default:
      return state;
  }
}

/**
 * Reducer that store message
 * @param  {string} state  =             '' message body
 * @param  {object} action action object
 * @return {string}        return message string
 */
function message(state = '', action) {
  switch (action.type) {
    case types.RECEIVE_MESSAGE:
      return action.message;
    default:
      return state;
  }
}

/**
 * Reducer that store credit card number
 * @param  {string} state  =             '' credit card number
 * @param  {object} action action object
 * @return {string}        return credit card number
 */
function ccnum(state = '', action) {
  switch (action.type) {
    case types.ADD_CREDIT_CARD:
      return action.ccnum;
    default:
      return state;
  }
}

/**
 * Reducer that is responsible to store PIN number
 * @param  {string} state  =             '' credit card PIN number
 * @param  {object} action action object
 * @return {string}        return PIN
 */
function pin(state = '', action) {
  switch (action.type) {
    case types.ADD_CARD_PIN:
      return action.pin;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  products,
  selectedItemId,
  isBuyButtonEnabled,
  activeCredit,
  message,
  ccnum,
  pin
});

export default rootReducer;
