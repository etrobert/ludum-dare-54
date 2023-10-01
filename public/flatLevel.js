import { characterWalkRightAnimation } from './animations.js';
import { backgroundEntity } from './background.js';
import { addVectors, multiplyVector } from './vector.js';

const size = { x: 64, y: 64 };

const character = {
  name: 'character',
  health: 3,
  maxHealth: 3,
  lastInvulnerability: 0,
  hitBoxRadius: 10,
  dashing: false,
  lastDash: 0,
  position: addVectors(
    multiplyVector(0.5, backgroundEntity.size),
    multiplyVector(-0.5, size)
  ),
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: { x: 0, y: 0 },
  size,
  display: characterWalkRightAnimation,
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
