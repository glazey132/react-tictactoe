import React, { Component } from 'react';
import Board from './Board/Board';
import './Game.css';

class Game extends Component {
  render() {
    return (
      <div className="game">
        <Board />
      </div>
    );
  }
}

export default Game;
