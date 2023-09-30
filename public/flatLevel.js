const jellyfishImage = new Image();
jellyfishImage.src = 'assets/images/animations/jellyfish.png';

const jellyfishAnimation = {
  image: jellyfishImage,
  sw: 16,
  sh: 16,
  animationFrames: 16,
};

const characterImage = new Image();
characterImage.src = 'assets/images/animations/character.png';

const characterAnimation = {
  image: characterImage,
  sw: 50,
  sh: 50,
  animationFrames: 1,
};

const character = {
  name: 'character',
  health: 3,
  maxHealth: 3,
  lastInvulnerability: 0,
  hitBoxRadius: 10,
  position: { x: 32, y: 32 },
  speed: { x: 0, y: 0 }, // px per ms
  acceleration: { x: 0, y: 0 },
  size: { x: 50, y: 50 },
  display: characterAnimation,
};

const obstacle1 = {
  name: 'obstacle1',
  position: { x: 16, y: 128 },
  size: { x: 280, y: 16 },
};

const obstacle2 = {
  name: 'obstacle2',
  position: { x: 128, y: 64 },
  size: { x: 16, y: 16 },
};

const flatLevel = {
  character,
  enemies: [],
  shroudRadius: 512,
  obstacles: [obstacle1, obstacle2],
};

export default flatLevel;
