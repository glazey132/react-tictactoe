import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  render() {
    console.log('this.props in sq: ', this.props);
    return (
      <div className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </div>
    );
  }
}

export default Square;
