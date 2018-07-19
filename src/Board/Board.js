import React, { Component } from 'react';
import './Board.css';

import Square from '../Square/Square';

class Board extends Component {
  //helper fn that renders squares
  renderSquare = i => {
    return (
      <Square
        key={i}
        value={this.props.squares[i]}
        onClick={() => this.props.handleClick(i)}
      />
    );
  };

  //helper fn that we call directly from render to create our board.
  createBoard = () => {
    let board = [];
    let index = 0;
    let rowIndex = 0;
    //outer loop to create board
    for (let i = 0; i < 3; i++) {
      rowIndex++;
      let row = [];

      //inner loop to create rows
      for (let j = 0; j < 3; j++) {
        row.push(this.renderSquare(index));
        index++;
      }
      //add the newly created row to our board
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
