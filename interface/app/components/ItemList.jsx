import React from 'react';
import Slot from './Slot.jsx';
import Item from './Item.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var itemNodes = this.props.products.map((product) => {
    let isSelectable = (product.count > 0);

    return (
      <Slot key={product.slot}>
        <Item
          key={product.slot}
          slot={product.slot}
          name={product.name}
          price={product.price}
          count={product.count}
          isSelectable={isSelectable}
          onSelectClick={this.props.onItemSelection}
          selectedItem={this.props.selectedItem} />
      </Slot>
      );
    });

    return (
      <div className="items">
        {itemNodes}
      </div>
    );
  }
}

export default ItemList;
