import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onSelectClick(this.props.slot);
  }

  render() {
    return (
      <div className="item panel panel-default">
        <div className="panel-heading"><span className="name">{this.props.name}</span>{' – '}<span className="price"><strong>${this.props.price}</strong></span></div>
        <div className="panel-body">Quantity: {this.props.count}</div>
        <div className="panel-footer">
          <button className="btn btn-default pull-right" disabled={!this.props.isSelectable} onClick={this.handleClick}>Select</button>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

export default Item;
