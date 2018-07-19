import React from 'react';
import './Square.css';

const Square = props => (
  <div
    className={`square ${props.highlight ? 'selected' : ''}`}
    onClick={() => props.onClick()}
  >
    {props.value}
  </div>
);
export default Square;
