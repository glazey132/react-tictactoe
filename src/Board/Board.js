import React, { Component } from 'react';
import './Board.css';

import Square from '../Square/Square';

class Board extends Component {
  renderSquare = i => {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
      />
    );
  };

  createBoard = () => {
    let board = [];
    let index = 0;
    let rowIndex = 0;
    //outer loop to create parent
    for (let i = 0; i < 3; i++) {
      rowIndex++;
      let row = [];

      //inner loop to create children
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(index));
        index++;
      }

      board.push(
        <div key={rowIndex} className="board-row">
          {row}
        </div>
      );
    }
    return board;
  };

  render() {
    return <div>{this.createBoard()}</div>;
  }
}

export default Board;
