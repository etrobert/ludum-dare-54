import { addVectors, multiplyVector } from './vector.js';

const collision = (entity1, entity2) =>
  entity1.position.x < entity2.position.x + entity2.size.x &&
  entity1.position.x + entity1.size.x > entity2.position.x &&
  entity1.position.y < entity2.position.y + entity2.size.y &&
  entity1.position.y + entity1.size.y > entity2.position.y;

const resistanceConstant = 1;

const updateSpeed = (entity, timeDelta) => {
  if (!entity.speed) return entity;

  // TODO: Should we factor in timeDelta?
  const resistance = {
    x: -entity.speed.x * Math.abs(entity.speed.x) * resistanceConstant,
    y: -entity.speed.y * Math.abs(entity.speed.y) * resistanceConstant,
  };

  const acceleration = multiplyVector(timeDelta, entity.acceleration);

  const speed = addVectors(resistance, acceleration, entity.speed);

  return { ...entity, speed };
};

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

const updateYPosition = (entity, otherEntities, timeDelta) => {
  const collidingEntities = yCollidingEntities(
    entity,
    otherEntities,
    timeDelta
  );

  if (collidingEntities.length === 0)
    return {
      ...entity,
      position: {
        x: entity.position.x,
        y: entity.position.y + entity.speed.y * timeDelta,
      },
    };

  if (entity.speed.y > 0) {
    const closestCollidingEntity = collidingEntities[0]; // TODO: min of position
    return {
      ...entity,
      position: {
        x: entity.position.x,
        y: closestCollidingEntity.position.y - entity.size.x,
      },
      speed: {
        x: entity.speed.x,
        y: 0,
      },
    };
  } else {
    const closestCollidingEntity = collidingEntities[0]; // TODO
    return {
      ...entity,
      position: {
        x: entity.position.x,
        y: closestCollidingEntity.position.y + closestCollidingEntity.size.y,
      },
      speed: {
        x: entity.speed.x,
        y: 0,
      },
    };
  }
};

const xCollidingEntities = (entity, otherEntities, timeDelta) => {
  const newXPosition = {
    x: entity.position.x + entity.speed.x * timeDelta,
    y: entity.position.y,
  };
  const newEntity = {
    ...entity,
    position: newXPosition,
  };

  const collidingEntities = otherEntities.filter((otherEntity) =>
    collision(otherEntity, newEntity)
  );

  return collidingEntities;
};

const updateXPosition = (entity, otherEntities, timeDelta) => {
  const collidingEntities = xCollidingEntities(
    entity,
    otherEntities,
    timeDelta
  );

  if (collidingEntities.length === 0)
    return {
      ...entity,
      position: {
        x: entity.position.x + entity.speed.x * timeDelta,
        y: entity.position.y,
      },
    };

  if (entity.speed.x > 0) {
    const closestCollidingEntity = collidingEntities[0]; // TODO: min of position
    return {
      ...entity,
      position: {
        x: closestCollidingEntity.position.x - entity.size.x,
        y: entity.position.y,
      },
      speed: {
        x: 0,
        y: entity.speed.y,
      },
    };
  } else {
    const closestCollidingEntity = collidingEntities[0]; // TODO
    return {
      ...entity,
      position: {
        x: closestCollidingEntity.position.x + closestCollidingEntity.size.x,
        y: entity.position.y,
      },
      speed: {
        x: 0,
        y: entity.speed.y,
      },
    };
  }
};

const updatePosition = (entity, state, index, timeDelta) => {
  if (!entity.speed) return entity;

  const otherEntities = state.toSpliced(index, 1);

  const xUpdatedEntity = updateXPosition(entity, otherEntities, timeDelta);
  const yUpdatedEntity = updateYPosition(entity, otherEntities, timeDelta);

  return {
    ...entity,
    position: {
      x: xUpdatedEntity.position.x,
      y: yUpdatedEntity.position.y,
    },
    speed: {
      x: xUpdatedEntity.speed.x,
      y: yUpdatedEntity.speed.y,
    },
  };
};

const updateState = (state, timeDelta) =>
  state.map((entity, index) => {
    entity = updateSpeed(entity, timeDelta);
    return updatePosition(entity, state, index, timeDelta);
  });

export default updateState;
