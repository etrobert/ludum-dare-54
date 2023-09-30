import render from './render.js';
import updateState from './updateState.js';
import { playMusic, pauseMusic } from './audio/backgroundMusic.js';

import squareLevel from './squareLevel.js';
import flatLevel from './flatLevel.js';
import { multiplyVector } from './vector.js';

let state = flatLevel;

let previousTime = Date.now();

const accelerationConstant = 2 / 1000;
const diagonalProjection = Math.cos(Math.PI / 4);

const getUserAccelerationX = () => {
  if (controls.ArrowLeft && controls.ArrowRight) return 0;
  if (controls.ArrowRight) return accelerationConstant;
  if (controls.ArrowLeft) return -accelerationConstant;
  return 0;
};

const getUserAccelerationY = () => {
  if (controls.ArrowUp && controls.ArrowDown) return 0;
  if (controls.ArrowDown) return accelerationConstant;
  if (controls.ArrowUp) return -accelerationConstant;
  return 0;
};

const getUserAcceleration = () => {
  const acceleration = { x: getUserAccelerationX(), y: getUserAccelerationY() };
  const diagonal = acceleration.x !== 0 && acceleration.y !== 0;
  return diagonal
    ? multiplyVector(diagonalProjection, acceleration)
    : acceleration;
};

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state[0].acceleration = getUserAcceleration(); // TODO: Preserve existing acceleration
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