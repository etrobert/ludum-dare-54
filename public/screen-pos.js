import { scale, canvas } from './graphics.js';
import { addVectors, multiplyVector } from './vector.js';

const getCharacterScreenPos = (character) => ({
  x: canvas.width / 2 - (character.size.x * scale) / 2,
  y: canvas.height / 2 - (character.size.y * scale) / 2,
});

const getScreenPos = (entity, character) => {
  const characterScreenPos = getCharacterScreenPos(character);

  return addVectors(
    multiplyVector(scale, entity.position),
    characterScreenPos,
    multiplyVector(-scale, character.position)
  );
};

export { getCharacterScreenPos, getScreenPos };
