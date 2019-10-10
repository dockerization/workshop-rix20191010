import React from 'react';

class MoneyTaker extends React.Component {
  constructor(props) {
    super(props);

    this.handleMoneyClick = this.handleMoneyClick.bind(this);
    this.handleBuy = this.handleBuy.bind(this);
  }

  handleMoneyClick(event) {
    this.props.onMoneyAddition(event.target.firstChild.nodeValue);
  }

  handleBuy() {
    this.props.onBuyClick();
  }

  render() {
    return (
      <div className="moneyTaker panel panel-default">
        <div className="panel-heading">Cash Input</div>
        <div className="panel-body">
          <div className="input-group">
            <input type="text" className="form-control" value={this.props.activeCredit} readOnly/>
            <div className="input-group-btn">
              <button className="coinFive btn btn-default" onClick={this.handleMoneyClick}>0.5</button>
              <button className="coinTen btn btn-default" onClick={this.handleMoneyClick}>0.10</button>
              <button className="coinTwenty btn btn-default" onClick={this.handleMoneyClick}>0.20</button>
              <button className="submitMoney btn btn-success" disabled={!this.props.isBuyButtonEnabled} onClick={this.handleBuy}>Buy!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoneyTaker;
