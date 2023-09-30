import { jellyfishJumpAnimation } from './animations.js';

const enemy = {
  name: 'enemy',
  hitBoxRadius: 10,
  position: { x: 32, y: 32 },
  speed: { x: 100 / 1000, y: 0 }, // px per ms
  accelerationconstant: 1 / 10000,
  acceleration: { x: 0.0, y: 0 },
  //   acceleration: { x: 0.001, y: 0 },
  size: { x: 32, y: 32 },
  display: jellyfishJumpAnimation,
};
const createEnemy = (position) => ({ ...enemy, position });

const createEnemyOutScreen = (state) => {
  const position = { x: 0, y: 0 };
  return createEnemy(position);
};

const spawnEnemy = (state) => {
  return { ...state, enemies: [...state.enemies, createEnemyOutScreen(state)] };
};

export { spawnEnemy };
