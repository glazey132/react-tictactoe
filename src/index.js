import React from 'react';
import ReactDOM from 'react-dom';
import './Game.css';
import Game from './Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
registerServiceWorker();
