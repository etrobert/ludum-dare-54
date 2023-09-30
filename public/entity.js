import { addVectors, multiplyVector } from './vector.js';

const entityCenter = (entity) =>
  addVectors(entity.position, multiplyVector(0.5, entity.size));

const distanceVector = (entity1, entity2) =>
  addVectors(entityCenter(entity1), multiplyVector(-1, entityCenter(entity2)));

const squaredDistance = (entity1, entity2) => {
  const vector = distanceVector(entity1, entity2);
  return vector.x * vector.x + vector.y * vector.y;
};

export { entityCenter, distanceVector, squaredDistance };
