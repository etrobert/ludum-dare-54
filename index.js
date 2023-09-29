import render from './render.js';
import updateState from './updateState.js';

import squareLevel from './squareLevel.js';
import flatLevel from './flatLevel.js';

let state = flatLevel;

let previousTime = Date.now();

const getUserAcceleration = () => {
  if (controls.ArrowLeft && controls.ArrowRight) return 0;
  if (controls.ArrowRight) return 0.1 / 1000;
  if (controls.ArrowLeft) return -0.1 / 1000;
  return 0;
};

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state[0].acceleration.x = getUserAcceleration(); // TODO: Preserve existing acceleration
  if (controls.jump) {
    state[0].speed.y = -60 / 1000;
    controls.jump = false;
  }
  state = updateState(state, timeDelta);

  render(state);
};

let controls = {};

document.addEventListener('keydown', (event) => (controls[event.key] = true));
document.addEventListener('keyup', (event) => (controls[event.key] = false));
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') controls.jump = true;
});

setInterval(gameLoop, 30);
