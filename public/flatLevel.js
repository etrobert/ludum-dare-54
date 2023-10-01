import { characterWalkRightAnimation } from './animations.js';

const size = { x: 128, y: 128 };

const character = {
  name: 'character',
  health: 3,
  maxHealth: 3,
  lastInvulnerability: 0,
  hitBoxRadius: 20,
  dashing: false,
  lastDash: 0,
  position: { x: 0, y: 0 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: { x: 0, y: 0 },
  size,
  display: characterWalkRightAnimation,
  animationStart: 0,
};

const flatLevel = {
  character,
  enemies: [],
  shroudRadius: 512,
  obstacles: [],
  lastSpawn: 0,
  score: 0,
};

export default flatLevel;
