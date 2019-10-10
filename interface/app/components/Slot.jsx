import React from 'react';

class Slot extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="slot col-md-3">{this.props.children}</div>
    );
  }
}

export default Slot;
