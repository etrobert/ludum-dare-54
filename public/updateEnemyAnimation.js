import {
  enemyWalkLeftAnimation,
  enemyWalkRightAnimation,
} from './animations.js';
import getDirection from './getDirection.js';

const updateEnemyAnimation = (enemy) => {
  switch (getDirection(enemy)) {
    case 'left':
      return {
        ...enemy,
        display: enemyWalkLeftAnimation,
      };
    default:
      return {
        ...enemy,
        display: enemyWalkRightAnimation,
      };
  }
};

export default updateEnemyAnimation;
