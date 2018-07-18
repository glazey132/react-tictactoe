import React, { Component } from 'react';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: ['', '', '', '', '', '', '', '', '']
    };
  }
  render() {
    return (
      <div className="board">
        {this.state.board.map((cell, index) => {
          return <div key={index} className="square" />;
        })}
      </div>
    );
  }
}

export default Board;
