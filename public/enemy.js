const enemyFrames = new Image();
enemyFrames.src = 'assets/images/animations/jellyfish-jump.png';

const enemy = {
  name: 'enemy',
  position: { x: 32, y: 32 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: { x: 0, y: 0 },
  size: { x: 32, y: 32 },
  display: {
    image: enemyFrames,
    sw: 16,
    sh: 16,
    animationFrames: 8,
  },
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
