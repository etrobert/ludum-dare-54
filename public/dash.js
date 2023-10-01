import { multiplyVector, normalizeVector } from './vector.js';

const dashCooldown = 1 * 1000;
const dashSpeed = 10 / 1000;
const dashDuration = 0.5 * 1000;

const dash = (state, currentTime) => {
  if (
    currentTime - state.character.lastDash < dashCooldown ||
    (state.character.speed.x === 0 && state.character.speed.y === 0)
  )
    return state;
  const acceleration = multiplyVector(
    dashSpeed,
    normalizeVector(state.character.speed)
  );
  return {
    ...state,
    character: {
      ...state.character,
      dashing: true,
      lastDash: currentTime,
      lastInvulnerability: currentTime,
      acceleration,
    },
  };
};

export { dash, dashCooldown, dashDuration };
