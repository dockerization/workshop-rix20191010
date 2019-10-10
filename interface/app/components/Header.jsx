import React from 'react';

class Header extends React.Component {
  render() {

    let inlineStyle = {textAlign: 'center'};

    return (
      <div className="header row">
        <div className="col-md-12">
          <h1 style={inlineStyle}>Herñi</h1>
        </div>
      </div>
    );
  }
}

export default Header;
