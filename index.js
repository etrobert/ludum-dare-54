import render from './render.js';
import updateState from './updateState.js';
import { playMusic, pauseMusic } from './audio/backgroundMusic.js';

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
  state = updateState(state, timeDelta);

  render(state, currentTime);
};

let controls = {};

document.addEventListener('keydown', (event) => (controls[event.key] = true));
document.addEventListener('keyup', (event) => (controls[event.key] = false));
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') console.log('space was pressed');
});

let gameLoopInterval;

const startGameLoop = () => {
  if (!gameLoopInterval) {
    gameLoopInterval = setInterval(gameLoop, 10);
    previousTime = Date.now();
  }
};

const menu = document.querySelector('menu');

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    clearInterval(gameLoopInterval);
    gameLoopInterval = undefined;
    menu.style.display = 'block';
    pauseMusic();
  }
});

menu.addEventListener('click', () => {
  startGameLoop();
  menu.style.display = 'none';
  playMusic();
});
