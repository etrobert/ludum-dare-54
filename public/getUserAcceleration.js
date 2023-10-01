import { multiplyVector } from './vector.js';

const accelerationConstant = 2 / 1000;
const diagonalProjection = Math.cos(Math.PI / 4);

const getUserAccelerationX = (controls) => {
  if (controls.ArrowLeft && controls.ArrowRight) return 0;
  if (controls.ArrowRight) return accelerationConstant;
  if (controls.ArrowLeft) return -accelerationConstant;
  return 0;
};

const getUserAccelerationY = (controls) => {
  if (controls.ArrowUp && controls.ArrowDown) return 0;
  if (controls.ArrowDown) return accelerationConstant;
  if (controls.ArrowUp) return -accelerationConstant;
  return 0;
};

const getUserAcceleration = (controls) => {
  const acceleration = {
    x: getUserAccelerationX(controls),
    y: getUserAccelerationY(controls),
  };
  const diagonal = acceleration.x !== 0 && acceleration.y !== 0;
  return diagonal
    ? multiplyVector(diagonalProjection, acceleration)
    : acceleration;
};

export default getUserAcceleration;
