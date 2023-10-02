import { dashSfx } from './audio/openSounds.js';
import { playSfx } from './audio/playSounds.js';

const specialCastingTime = 300;
const specialRadius = 200;
const lightSpecialMultiplier = 40 / 1000;
const specialDuration = 0.5 * 1000;
const minimumPool = 10;

const special = (state, currentTime) => {
  if (state.character.specialPool < minimumPool) return state;
  // playSfx(dashSfx);
  return {
    ...state,
    character: {
      ...state.character,
      specialing: true,
      lastSpecial: currentTime,
      lastInvulnerability: currentTime,
      specialPool: state.character.specialPool - minimumPool,
    },
  };
};

export {
  specialCastingTime,
  special,
  specialRadius,
  lightSpecialMultiplier,
  specialDuration,
};
