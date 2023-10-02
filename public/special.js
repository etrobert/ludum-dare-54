import { specialSfx } from './audio/openSounds.js';
import { playSfx } from './audio/playSounds.js';
import plotLight from './plotLight.js';

const specialCastingTime = 1000;
const specialDamageTime = 500;
const specialRadius = 200;
const specialDuration = 1200;
const minimumPool = 10;

const special = (state, currentTime) => {
  if (state.character.specialPool < minimumPool) return state;
  const newLightPool = state.character.specialPool - minimumPool;
  plotLight(newLightPool);
  playSfx(specialSfx);
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
  specialDamageTime,
  special,
  specialRadius,
  specialDuration,
  minimumPool,
};
