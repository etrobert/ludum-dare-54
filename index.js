import render from './render.js';
import updateState from './updateState.js';

const gravity = {
  x: 0,
  y: 1 / 1000 / 100,
};

const character = {
  name: 'character',
  position: {
    x: 10,
    y: 10,
  },
  speed: {
    x: 0, // px per ms
    y: 0, // px per ms
  },
  acceleration: gravity,
  size: {
    x: 20,
    y: 20,
  },
};

const platform = {
  name: 'platform',
  position: {
    x: 0,
    y: 100,
  },
  size: {
    x: 100,
    y: 10,
  },
};

let state = [character, platform];

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state = updateState(state, timeDelta);

  render(state);
};

setInterval(gameLoop, 60);
