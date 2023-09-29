const collision = (entity1, entity2) =>
  entity1.position.x < entity2.position.x + entity2.size.x &&
  entity1.position.x + entity1.size.x > entity2.position.x &&
  entity1.position.y < entity2.position.y + entity2.size.y &&
  entity1.position.y + entity1.size.y > entity2.position.y;

const updateSpeed = (entity, timeDelta) =>
  entity.acceleration
    ? {
        ...entity,
        speed: {
          x: entity.speed.x + entity.acceleration.x * timeDelta,
          y: entity.speed.y + entity.acceleration.y * timeDelta,
        },
      }
    : entity;

const yCollidingEntities = (entity, otherEntities, timeDelta) => {
  const newYPosition = {
    x: entity.position.x,
    y: entity.position.y + entity.speed.y * timeDelta,
  };
  const newEntity = {
    ...entity,
    position: newYPosition,
  };

  const collidingEntities = otherEntities.filter((otherEntity) =>
    collision(otherEntity, newEntity)
  );

  return collidingEntities;
};

const updatePosition = (entity, state, index, timeDelta) => {
  if (!entity.speed) return entity;

  const newPosition = {
    x: entity.position.x + entity.speed.x * timeDelta,
    y: entity.position.y + entity.speed.y * timeDelta,
  };
  const newEntity = {
    ...entity,
    position: newPosition,
  };

  const otherEntities = state.toSpliced(index, 1);

  console.log(yCollidingEntities(entity, otherEntities, timeDelta));

  const anyCollision = otherEntities.some((otherEntity) =>
    collision(otherEntity, newEntity)
  );

  return anyCollision ? entity : newEntity;
};

const updateState = (state, timeDelta) =>
  state.map((entity, index) => {
    entity = updateSpeed(entity, timeDelta);
    return updatePosition(entity, state, index, timeDelta);
  });

export default updateState;
