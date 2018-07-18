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

  handleClick(i) {
    console.log('this.state.selected on click ', this.state.selected);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = [...current.squares];
    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }
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

  jumpTo(move) {
    console.log('move in jumpto ', move);
    if (move === 0) {
      this.setState({
        selected: 0,
        stepNumber: move,
        xIsNext: move % 2 ? false : true
      });
    } else {
      this.setState({
        selected: move,
        stepNumber: move,
        xIsNext: move % 2 ? false : true
      });
    }
  }

  calculateWinner(squares) {
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

    for (let i = 0; i < wins.length; i++) {
      const [a, b, c] = wins[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[b] === squares[c]
      ) {
        return squares[a];
      }
    }
    return false;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    let status;
    if (winner) {
      status = `We have a winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    }

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
        <div className="game-board">
          <Board
            handleClick={i => this.handleClick(i)}
            squares={current.squares}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

export default Game;
