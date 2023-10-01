import { plotHealth, plotMaxHealth } from './plotHealth.js';
import { dash, dashCooldown } from './dash.js';
import render from './render.js';
import updateState from './updateState.js';
import { spawnEnemy } from './enemy.js';
import { playMusic, pauseMusic } from './audio/backgroundMusic.js';
import flatLevel from './flatLevel.js';
import getUserAcceleration from './getUserAcceleration.js';

let state = flatLevel;
plotHealth(state.character.health);
plotMaxHealth(state.character.maxHealth);

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  if (controls.requestDash) {
    controls.requestDash = false;
    state = dash(state, currentTime);
  }

  if (!state.character.dashing)
    state.character.acceleration = getUserAcceleration(controls); // TODO: Preserve existing acceleration

  state = updateState(state, timeDelta, currentTime);

  render(state, currentTime);
};

let controls = {};

document.addEventListener('keydown', (event) => (controls[event.key] = true));
document.addEventListener('keyup', (event) => (controls[event.key] = false));
document.addEventListener('keydown', (event) => {
  if (event.key === ' ') {
    controls.requestDash = true;
  }
});

let gameLoopInterval;

const startGameLoop = () => {
  if (!gameLoopInterval) {
    gameLoopInterval = setInterval(gameLoop, 10);
    previousTime = Date.now();
  }
};

const menu = document.querySelector('menu');

const pause = () => {
  clearInterval(gameLoopInterval);
  gameLoopInterval = undefined;
  menu.style.display = 'block';
  pauseMusic();
};

const play = () => {
  startGameLoop();
  menu.style.display = 'none';
  playMusic();
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') pause();
});

menu.addEventListener('click', play);

// play(); // TODO: Remove autoplay
