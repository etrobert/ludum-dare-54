import {
  characterWalkRightAnimation,
  characterWalkLeftAnimation,
  characterDashLeftAnimation,
  characterDashRightAnimation,
  characterIdleRightAnimation,
} from './animations.js';

const getDirection = (character) => {
  if (character.speed.x < 0) return 'left';
  if (character.speed.x > 0) return 'right';
  return 'none';
};

const getCharacterAnimation = (character) => {
  const direction = getDirection(character);

  if (character.dashing)
    return {
      size: {
        x: 256,
        y: 128,
      },
      display:
        direction === 'left'
          ? characterDashLeftAnimation
          : characterDashRightAnimation,
    };

  if (character.speed.x === 0 && character.speed.y === 0)
    return {
      size: {
        x: 128,
        y: 128,
      },
      display: characterIdleRightAnimation,
    };

  return {
    size: {
      x: 128,
      y: 128,
    },
    display:
      direction === 'left'
        ? characterWalkLeftAnimation
        : characterWalkRightAnimation,
  };
};

const updateCharacterAnimation = (character, currentTime) => {
  const animation = getCharacterAnimation(character, currentTime);
  if (character.display === animation.display) return character;
  return {
    ...character,
    ...animation,
    animationStart: currentTime,
  };
};

export default updateCharacterAnimation;
