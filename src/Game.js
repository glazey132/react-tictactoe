import React, { Component } from 'react';
import Board from './Board/Board';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      selected: 0
    };
  }

  //helper fn to handle click of square
  handleClick(i) {
    /* grab game history from state from beginning to most previous move.
    ** set current to our last move aka most previous game board state.
    ** check if theres already a winner or the square is already filled before proceeding.
    */
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
    //set square to players symbol then update state.
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      selected: this.state.selected + 1,
      stepNumber: history.length,
      history: history.concat([
        {
          squares: squares
        }
      ]),
      xIsNext: !this.state.xIsNext
    });
  }

  //helper fn to help us travel back in time (to a previous game state)!
  jumpTo(move) {
    //set game state to older variables and update player turn to correct player
    this.setState({
      selected: move,
      stepNumber: move,
      xIsNext: move % 2 ? false : true
    });
  }

  //helper fn to calculate when a players move creates a winner
  calculateWinner(squares) {
    //possible winning game state formations when populated by single player symbol
    const wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    /* check if a single symbol populates each cell of every possible win.
    ** if player won, return the player symbol and winningcombo
    */
    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return {
          player: squares[a],
          winningCombo: [a, b, c]
        };
      }
    }
    return false;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winObj = this.calculateWinner(current.squares);
    let board;
    let status;
    /*if someone won create a board component with new winningCombo prop
    **so we can pass the indices down and have the square component
    **change color if the square is an index found in the winning sequence.
    */
    if (winObj) {
      status = `We have a winner: ${winObj.player}`;
      board = (
        <Board
          handleClick={i => this.handleClick(i)}
          squares={current.squares}
          winningCombo={winObj.winningCombo}
        />
      );
    } else {
      board = (
        <Board
          handleClick={i => this.handleClick(i)}
          squares={current.squares}
        />
      );
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }
    //map over the move array and create an html list of previous moves made
    const moves = this.state.history.map((step, move) => {
      const desc = move ? `Move # ${move}` : `Game start`;
      return (
        <li key={move}>
          <a
            className={this.state.selected === move ? 'bold-a' : 'regular-a'}
            href="#"
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </a>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">{board}</div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
