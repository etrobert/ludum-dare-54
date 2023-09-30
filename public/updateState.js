import { addVectors, multiplyVector, normalizeVector } from './vector.js';

const collision = (entity1, entity2) =>
  entity1.position.x < entity2.position.x + entity2.size.x &&
  entity1.position.x + entity1.size.x > entity2.position.x &&
  entity1.position.y < entity2.position.y + entity2.size.y &&
  entity1.position.y + entity1.size.y > entity2.position.y;

const resistanceConstant = 200 / 1000;
const minSpeed = 0.01;

const updateSpeed = (entity, timeDelta) => {
  if (!entity.speed) return entity;

  const resistanceImpact = multiplyVector(timeDelta * resistanceConstant, {
    x: -entity.speed.x * Math.abs(entity.speed.x),
    y: -entity.speed.y * Math.abs(entity.speed.y),
  });

  const accelerationImpact = multiplyVector(timeDelta, entity.acceleration);

  const speed = addVectors(resistanceImpact, accelerationImpact, entity.speed);
  speed.x = Math.abs(speed.x) < minSpeed ? 0 : speed.x;
  speed.y = Math.abs(speed.y) < minSpeed ? 0 : speed.y;

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

const updateYPosition = (entity, obstacles, timeDelta) => {
  const collidingEntities = yCollidingEntities(entity, obstacles, timeDelta);

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

const updateXPosition = (entity, obstacles, timeDelta) => {
  const collidingEntities = xCollidingEntities(entity, obstacles, timeDelta);

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

const updatePosition = (entity, state, timeDelta) => {
  if (!entity.speed) return entity;

  const xUpdatedEntity = updateXPosition(entity, state.obstacles, timeDelta);
  const yUpdatedEntity = updateYPosition(entity, state.obstacles, timeDelta);

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

const updateEnemyAcceleration = (enemy, characterPos, timeDelta) => {
  const vectortoCharacter = addVectors(
    characterPos,
    multiplyVector(-1, enemy.position)
  );
  const normVectortoCharacter = normalizeVector(vectortoCharacter);
  enemy.accelerationconstant * timeDelta;
  return {
    ...enemy,
    acceleration: multiplyVector(
      enemy.accelerationconstant * timeDelta,
      normVectortoCharacter
    ),
  };
};

const shroudShrinkSpeed = 50 / 1000;

const updateShroud = (state, timeDelta) => ({
  ...state,
  shroudRadius: Math.max(state.shroudRadius - shroudShrinkSpeed * timeDelta, 0),
});

const updateState = (state, timeDelta) => {
  state.character = updateSpeed(state.character, timeDelta);
  state.character = updatePosition(state.character, state, timeDelta);

  state.enemies = state.enemies.map((enemy) => {
    enemy = updateEnemyAcceleration(enemy, state.character.position, timeDelta);
    enemy = updateSpeed(enemy, timeDelta);
    return updatePosition(enemy, state, timeDelta);
  });

  state = updateShroud(state, timeDelta);

  return state;
};
export default updateState;
