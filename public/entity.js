import { addVectors, multiplyVector } from './vector.js';

const distanceVector = (entity1, entity2) =>
  addVectors(entity1.position, multiplyVector(-1, entity2.position));

const squaredDistance = (entity1, entity2) => {
  const vector = distanceVector(entity1, entity2);
  return vector.x * vector.x + vector.y * vector.y;
};

const collisionAABB = (entity1, entity2) =>
  entity1.position.x < entity2.position.x + entity2.size.x &&
  entity1.position.x + entity1.size.x > entity2.position.x &&
  entity1.position.y < entity2.position.y + entity2.size.y &&
  entity1.position.y + entity1.size.y > entity2.position.y;

const collisionRadius = (entity1, entity2) => {
  const collidingDistance = entity1.hitBoxRadius + entity1.hitBoxRadius;
  return (
    squaredDistance(entity1, entity2) < collidingDistance * collidingDistance
  );
};

export { distanceVector, squaredDistance, collisionAABB, collisionRadius };
