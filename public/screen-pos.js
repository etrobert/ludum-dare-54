import { canvas } from './graphics.js';
import { addVectors, multiplyVector } from './vector.js';

const canvasSize = { x: canvas.width, y: canvas.height };

const getScreenPos = (entity, character) => {
  return addVectors(
    entity?.display?.offset ?? { x: 0, y: 0 },
    multiplyVector(0.5, canvasSize),
    entity.position,
    multiplyVector(-1, character.position),
    multiplyVector(-1 / 2, entity.size)
  );
};

export { getScreenPos };
