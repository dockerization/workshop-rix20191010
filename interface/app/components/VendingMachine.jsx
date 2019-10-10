import React from 'react';
import { connect } from 'react-redux'
import ReactDom from 'react-dom';
import ItemList from './ItemList.jsx';
import MoneyTaker from './MoneyTaker.jsx';
import CreditCardTaker from './CreditCardTaker.jsx';
import Message from './Message.jsx';
import Header from './Header.jsx';
import * as Actions from '../actions/actions.js';

class VendingMachine extends React.Component {
  constructor(props) {
    super(props);

    this.handleItemSelection = this.handleItemSelection.bind(this);
    this.sendMoneyRequest = this.sendMoneyRequest.bind(this);
    this.handleBuyButtonClick = this.handleBuyButtonClick.bind(this);
    this.handlePayButtonClick = this.handlePayButtonClick.bind(this);
    this.handleCreditCardInput = this.handleCreditCardInput.bind(this);
    this.handlePinInput = this.handlePinInput.bind(this);
  }

  // when component is loaded, get product list
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(Actions.fetchProducts());
  }

  sendMoneyRequest(amount) {
    const {dispatch} = this.props;

    dispatch(Actions.requestCash(amount));
  }

  // when item is selected enabled buy button
  handleItemSelection(id) {
    const {dispatch} = this.props;

    dispatch(Actions.enableBuyButton());
    dispatch(Actions.selectItem(id));
  }

  // after purchase, disable button
  handleBuyButtonClick() {
    // after purchase, download product list
    const {dispatch, selectedItemId} = this.props;

    dispatch(Actions.requestBuy(selectedItemId));
    dispatch(Actions.fetchProducts());
    dispatch(Actions.disableBuyButton());
  }

  handleCreditCardInput(event) {
    const {dispatch} = this.props;

    dispatch(Actions.addCreditCard(event.target.value));
  }

  handlePinInput(event) {
    const {dispatch} = this.props;

    dispatch(Actions.addCardPin(event.target.value));
  }

  // after purchase with cc, disable button
  handlePayButtonClick() {
    // after purchase, download product list
    const {dispatch, selectedItemId, ccnum, pin} = this.props;

    dispatch(Actions.requestBuy(selectedItemId, 'card', {
      ccnum: parseInt(ccnum),
      pin: parseInt(pin)
    }));
    dispatch(Actions.fetchProducts());
    dispatch(Actions.disableBuyButton());
  }

  render() {
    const {message,products,isBuyButtonEnabled,ccnum,pin,activeCredit} = this.props;

    let text = message;
    let messageBox = ' ';

    if (text !== '') {
      let style = (text == 'success') ? 'alert alert-success' : 'alert alert-warning';
      messageBox = <Message message={text} classes={style} />;
    }

    return (
      <div className="vendingMachine container-fluid">
        <Header />
        <div className="row">
          <div className="col-md-8">
            <ItemList products={products} onItemSelection={this.handleItemSelection} />
          </div>
          <div className="col-md-4">
            <MoneyTaker
              isBuyButtonEnabled={isBuyButtonEnabled}
              activeCredit={activeCredit}
              onMoneyAddition={this.sendMoneyRequest}
              onBuyClick={this.handleBuyButtonClick} />
            <CreditCardTaker
              isBuyButtonEnabled={isBuyButtonEnabled}
              ccnum={ccnum}
              pin={pin}
              onCrediCardChange={this.handleCreditCardInput}
              onPinChange={this.handlePinInput}
              onPayClick={this.handlePayButtonClick} />
            {messageBox}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(VendingMachine);
