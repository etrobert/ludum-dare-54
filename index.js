import render from './render.js';
import updateState from './updateState.js';

const gravity = {
  x: 0,
  y: 1 / 1000 / 20,
};

const character = {
  name: 'character',
  position: { x: 30, y: 10 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: gravity,
  size: { x: 20, y: 20 },
};

const platform1 = {
  name: 'platform1',
  position: { x: 10, y: 100 },
  size: { x: 100, y: 10 },
};

const platform2 = {
  name: 'platform2',
  position: { x: 100, y: 10 },
  size: { x: 10, y: 100 },
};

const platform3 = {
  name: 'platform3',
  position: { x: 10, y: 10 },
  size: { x: 10, y: 100 },
};

let state = [character, platform1, platform2, platform3];

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state = updateState(state, timeDelta);

  render(state);
};

setInterval(gameLoop, 30);
