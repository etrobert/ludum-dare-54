import { plotHealth, plotMaxHealth } from './plotHealth.js';
import { dash } from './dash.js';
import render from './render.js';
import updateState from './updateState.js';
import { gameMusic, shroudMusic, startMusic } from './audio/openSounds.js';
import { changeMusic } from './audio/playSounds.js';
import flatLevel from './flatLevel.js';
import getUserAcceleration from './getUserAcceleration.js';

let state;

const startGame = () => {
  state = flatLevel;
  state.playing = true;
  state.character.health = 3;
  state.startTime = Date.now();
  plotMaxHealth(state.character.maxHealth);
  plotHealth(state.character.health);
};

const pauseGame = () => {
  (state.playing = false), (state.startPause = Date.now());
};

const resumeGame = () => {
  state.startTime = state.startTime + (Date.now() - state.startPause);
};

// startGame();
state = flatLevel;
state.character.health = 0;

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
  pauseGame();
  clearInterval(gameLoopInterval);
  gameLoopInterval = undefined;
  startMenu.style.display = 'block';
  changeMusic([startMusic]);
};

const play = () => {
  if (!state.playing) {
    if (state.character.health === 0) startGame();
    else resumeGame();
    startGameLoop();
    startMenu.style.display = 'none';
    changeMusic([gameMusic, shroudMusic]);
  }
};

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') pause();
});

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') play();
});

// startMenu.addEventListener('click', play);

// play(); // TODO: Remove autoplay
