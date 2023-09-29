import render from './render.js';
import updateState from './updateState.js';
import squareLevel from './squareLevel.js';

let state = squareLevel;

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state = updateState(state, timeDelta);

  render(state);
};

setInterval(gameLoop, 30);
