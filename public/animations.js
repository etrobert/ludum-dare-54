const jellyfishImage = new Image();
jellyfishImage.src = 'assets/images/animations/jellyfish.png';

const jellyfishAnimation = {
  image: jellyfishImage,
  sw: 16,
  sh: 16,
  animationFrames: 16,
};

const jellyfishJumpImage = new Image();
jellyfishJumpImage.src = 'assets/images/animations/jellyfish-jump.png';

const jellyfishJumpAnimation = {
  image: jellyfishJumpImage,
  sw: 16,
  sh: 16,
  animationFrames: 8,
};

const enemyIdleImage = new Image();
enemyIdleImage.src = 'assets/images/animations/enemy-idle.png';

const enemyIdleAnimation = {
  image: enemyIdleImage,
  sw: 64,
  sh: 64,
  animationFrames: 8,
};

const enemyWalkRightImage = new Image();
enemyWalkRightImage.src = 'assets/images/animations/enemy-walk-right.png';

const enemyWalkRightAnimation = {
  image: enemyWalkRightImage,
  sw: 64,
  sh: 64,
  animationFrames: 7,
};

const characterImage = new Image();
characterImage.src = 'assets/images/animations/character.png';

const characterAnimation = {
  image: characterImage,
  sw: 50,
  sh: 50,
  animationFrames: 1,
};

const characterWalkRightImage = new Image();
characterWalkRightImage.src =
  'assets/images/animations/character-walk-right.png';

const characterWalkRightAnimation = {
  image: characterWalkRightImage,
  sw: 64,
  sh: 64,
  animationFrames: 4,
};

const characterWalkLeftImage = new Image();
characterWalkLeftImage.src = 'assets/images/animations/character-walk-left.png';

const characterWalkLeftAnimation = {
  image: characterWalkLeftImage,
  sw: 64,
  sh: 64,
  animationFrames: 4,
};

const characterDashLeftImage = new Image();
characterDashLeftImage.src = 'assets/images/animations/character-dash-left.png';

const characterDashLeftAnimation = {
  image: characterDashLeftImage,
  sw: 128,
  sh: 64,
  animationFrames: 4,
  offset: { x: -64, y: 0 },
};

const characterDashRightImage = new Image();
characterDashRightImage.src =
  'assets/images/animations/character-dash-right.png';

const characterDashRightAnimation = {
  image: characterDashRightImage,
  sw: 128,
  sh: 64,
  animationFrames: 10,
  offset: { x: 64, y: 0 },
};

export {
  jellyfishAnimation,
  jellyfishJumpAnimation,
  enemyIdleAnimation,
  enemyWalkRightAnimation,
  characterAnimation,
  characterWalkRightAnimation,
  characterWalkLeftAnimation,
  characterDashLeftAnimation,
  characterDashRightAnimation,
};
