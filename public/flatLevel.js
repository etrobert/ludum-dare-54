import { characterWalkRightAnimation } from './animations.js';

const character = {
  name: 'character',
  health: 3,
  maxHealth: 3,
  lastInvulnerability: 0,
  hitBoxRadius: 10,
  position: { x: 100, y: 100 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: { x: 0, y: 0 },
  size: { x: 64, y: 64 },
  display: characterWalkRightAnimation,
};

const flatLevel = {
  character,
  enemies: [],
  shroudRadius: 512,
  obstacles: [],
};

export default flatLevel;
