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

const enemyWalkLeftImage = new Image();
enemyWalkLeftImage.src = 'assets/images/animations/enemy-walk-left.png';

const enemyWalkLeftAnimation = {
  image: enemyWalkLeftImage,
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

const characterIdleRightImage = new Image();
characterIdleRightImage.src =
  'assets/images/animations/character-idle-right.png';

const characterIdleRightAnimation = {
  image: characterIdleRightImage,
  sw: 64,
  sh: 64,
  animationFrames: 12,
};

const characterWalkRightImage = new Image();
characterWalkRightImage.src =
  'assets/images/animations/character-walk-right.png';

const characterWalkRightAnimation = {
  image: characterWalkRightImage,
  sw: 64,
  sh: 64,
  animationFrames: 6,
};

const characterWalkLeftImage = new Image();
characterWalkLeftImage.src = 'assets/images/animations/character-walk-left.png';

const characterWalkLeftAnimation = {
  image: characterWalkLeftImage,
  sw: 64,
  sh: 64,
  animationFrames: 6,
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

const characterSpecialRightImage = new Image();
characterSpecialRightImage.src =
  'assets/images/animations/character-special-right.png';

const characterSpecialRightAnimation = {
  image: characterSpecialRightImage,
  sw: 928,
  sh: 513,
  animationFrames: 12,
};

export {
  jellyfishAnimation,
  jellyfishJumpAnimation,
  enemyIdleAnimation,
  enemyWalkRightAnimation,
  enemyWalkLeftAnimation,
  characterAnimation,
  characterIdleRightAnimation,
  characterWalkRightAnimation,
  characterWalkLeftAnimation,
  characterDashLeftAnimation,
  characterDashRightAnimation,
  characterSpecialRightAnimation,
};
