import {
  characterWalkRightAnimation,
  characterWalkLeftAnimation,
} from './animations.js';
import { plotHealth } from './plotHealth.js';
import { entityCenter, distanceVector, squaredDistance } from './entity.js';
import { addVectors, multiplyVector, normalizeVector } from './vector.js';
import { dashDuration } from './dash.js';
import { spawnEnemy } from './enemy.js';

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
  const vectortoCharacter = distanceVector(characterPos, enemy);
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

const damage = 1;

const hitCharacter = (state, currentTime) => {
  const newHealth = state.character.health - damage;
  plotHealth(newHealth);
  return (state = {
    ...state,
    character: {
      ...state.character,
      lastInvulnerability: currentTime,
      health: newHealth,
    },
  });
};

const radiusCollision = (entity1, entity2) => {
  const d2 = squaredDistance(entity1, entity2);
  return (
    d2 <
    (entity1.hitBoxRadius + entity2.hitBoxRadius) *
      (entity1.hitBoxRadius + entity2.hitBoxRadius)
  );
};

const applyEnemyDamage = (state, currentTime) => {
  const hits = state.enemies.some((enemy) =>
    radiusCollision(enemy, state.character)
  );
  return hits ? hitCharacter(state, currentTime) : state;
};

const resetDash = (state, currentTime) => {
  if (
    currentTime - state.character.lastDash > dashDuration &&
    state.character.dashing
  ) {
    return {
      ...state,
      character: {
        ...state.character,
        dashing: false,
        acceleration: { x: 0, y: 0 },
      },
    };
  }
  return state;
};

const applyDashDamage = (state) => {
  const countEnemies = state.enemies.length;
  const enemies = state.enemies.filter(
    (enemy) => !radiusCollision(enemy, state.character)
  );
  state.score = state.score + countEnemies - enemies.length;
  document.getElementById('score').innerHTML = state.score;
  return { ...state, enemies };
};

const invulnerabilityTime = 1 * 1000;
const spawnTimer = 2 * 1000;

const updateState = (state, timeDelta, currentTime) => {
  state = resetDash(state, currentTime);
  state.character = updateSpeed(state.character, timeDelta);
  state.character = updatePosition(state.character, state, timeDelta);

  if (state.character.speed.x < 0)
    state.character.display = characterWalkLeftAnimation;
  else if (state.character.speed.x > 0)
    state.character.display = characterWalkRightAnimation;

  state.enemies = state.enemies.map((enemy) => {
    enemy = updateEnemyAcceleration(enemy, state.character, timeDelta);
    enemy = updateSpeed(enemy, timeDelta);
    return updatePosition(enemy, state, timeDelta);
  });

  state = state.character.dashing ? applyDashDamage(state) : state;

  state =
    currentTime - state.lastSpawn > spawnTimer
      ? spawnEnemy(state, currentTime)
      : state;
  // state = updateShroud(state, timeDelta); // TODO: fixe crasg bug, add expension with enemies death
  return currentTime - state.character.lastInvulnerability < invulnerabilityTime
    ? state
    : applyEnemyDamage(state, currentTime);
};
export default updateState;
