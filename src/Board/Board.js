import React, { Component } from 'react';
import './Board.css';

import Square from '../Square/Square';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wonGame: false
    };
  }

  //helper fn that renders squares
  renderSquare = (i, shouldHighlight) => {
    return (
      <Square
        highlight={shouldHighlight}
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
    let winningCombo = this.props.winningCombo;
    //outer loop to create board
    for (let i = 0; i < 3; i++) {
      console.log('winning combo ', winningCombo);
      rowIndex++;
      let row = [];

      //inner loop to create rows
      for (let j = 0; j < 3; j++) {
        /* check if our winning combo is present and includes
        ** our current index. if so pass true parameter
        ** so we know to highlight it
        **/
        if (winningCombo) {
          if (winningCombo.includes(index)) {
            row.push(this.renderSquare(index, true));
          } else {
            row.push(this.renderSquare(index, false));
          }
        } else {
          row.push(this.renderSquare(index, false));
        }

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
