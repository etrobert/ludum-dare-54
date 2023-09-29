const gravity = {
  x: 1 / 1000 / 20,
  y: 1 / 1000 / 20,
};

const character = {
  name: 'character',
  position: { x: 30, y: 30 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: gravity,
  size: { x: 20, y: 20 },
};

const platform = {
  name: 'platform',
  position: { x: 100, y: 100 },
  size: { x: 100, y: 100 },
};

const diagonalTestLevel = [character, platform];

export default diagonalTestLevel;
