import { multiplyVector, normalizeVector } from './vector.js';

const dashCooldown = 1 * 1000;
const dashspeed = 10 / 1000;
const dashDuration = 0.5 * 1000;

const dash = (state, currentTime) => {
  if (
    currentTime - state.character.lastDash < dashCooldown ||
    (state.character.speed.x === 0 && state.character.speed.y === 0)
  )
    return state;
  const acceleration = multiplyVector(
    dashspeed,
    normalizeVector(state.character.speed)
  );
  state = {
    ...state,
    character: {
      ...state.character,
      dashing: true,
      lastDash: currentTime,
      lastInvulnerability: currentTime,
      acceleration,
    },
  };
  return state;
};

export { dash, dashCooldown, dashDuration };
