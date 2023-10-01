import { plotHealth, plotMaxHealth } from './plotHealth.js';
import { dash, dashCooldown } from './dash.js';
import render from './render.js';
import updateState from './updateState.js';
import { spawnEnemy } from './enemy.js';
import { gameMusic, shroudMusic, startMusic } from './audio/openSounds.js';
import { changeMusic } from './audio/playSounds.js';
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

  if (state.character.health === 0) {
    pause();
  }

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

const startMenu = document.querySelector('#start-menu');
const pause = () => {
  clearInterval(gameLoopInterval);
  gameLoopInterval = undefined;
  startMenu.style.display = 'block';
  changeMusic([startMusic]);
};

const play = () => {
  if (state.character.health === 0) {
    state = flatLevel;
    plotHealth(state.character.health);
  }
  startGameLoop();
  startMenu.style.display = 'none';
  changeMusic([gameMusic, shroudMusic]);
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') pause();
});

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') play();
});

// startMenu.addEventListener('click', play);

// play(); // TODO: Remove autoplay
