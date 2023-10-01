import { scale, canvas } from './graphics.js';
import { addVectors, multiplyVector } from './vector.js';

const canvasSize = { x: canvas.width, y: canvas.height };

const getScreenPos = (entity, character) => {
  return addVectors(
    multiplyVector(0.5, canvasSize),
    multiplyVector(scale, entity.position),
    multiplyVector(-scale, character.position),
    multiplyVector(-scale / 2, entity.size)
  );
};

export { getScreenPos };
