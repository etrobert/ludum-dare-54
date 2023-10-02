import { dashSfx } from './audio/openSounds.js';
import { playSfx } from './audio/playSounds.js';
import plotLight from './plotLight.js';

const specialCastingTime = 300;
const specialRadius = 200;
const lightSpecialMultiplier = 40 / 1000;
const specialDuration = 0.5 * 1000;
const minimumPool = 10;

const special = (state, currentTime) => {
  if (state.character.specialPool < minimumPool) return state;
  const newLightPool = state.character.specialPool - minimumPool;
  plotLight(newLightPool);
  // playSfx(dashSfx);
  return {
    ...state,
    character: {
      ...state.character,
      specialing: true,
      lastSpecial: currentTime,
      lastInvulnerability: currentTime,
      specialPool: newLightPool,
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
