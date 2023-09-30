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

const characterImage = new Image();
characterImage.src = 'assets/images/animations/character.png';

const characterAnimation = {
  image: characterImage,
  sw: 50,
  sh: 50,
  animationFrames: 1,
};

const characterWalkImage = new Image();
characterWalkImage.src = 'assets/images/animations/character-walk-right.png';

const characterWalkAnimation = {
  image: characterWalkImage,
  sw: 64,
  sh: 64,
  animationFrames: 4,
};

export {
  jellyfishAnimation,
  jellyfishJumpAnimation,
  characterAnimation,
  characterWalkAnimation,
};
