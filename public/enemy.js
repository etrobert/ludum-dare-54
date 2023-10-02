import { enemyWalkRightAnimation } from './animations.js';
import { addVectors } from './vector.js';

const enemyAccelerationConstant = 3 / 10000;

const diagScreen =
  Math.sqrt(948 * 0.5 * 948 * 0.5 + 533 * 0.5 * 533 * 0.5) + 20;

const enemy = {
  name: 'enemy',
  hitBoxRadius: 15,
  position: { x: 32, y: 32 },
  speed: { x: 100 / 1000, y: 0 }, // px per ms
  acceleration: { x: 0.0, y: 0 },
  size: { x: 128, y: 128 },
  display: enemyWalkRightAnimation,
  lastHit: 0,
};
const createEnemy = (position) => ({ ...enemy, position });

const createEnemyOutScreen = (state) => {
  const teta = 2 * Math.PI * Math.random();

  const position = {
    x: Math.cos(teta) * diagScreen,
    y: Math.sin(teta) * diagScreen,
  };
  return createEnemy(addVectors(position, state.character.position));
};

const spawnEnemy = (state, currentTime) => {
  return {
    ...state,
    enemies: [...state.enemies, createEnemyOutScreen(state)],
    lastSpawn: currentTime,
  };
};

export { spawnEnemy, enemyAccelerationConstant };
