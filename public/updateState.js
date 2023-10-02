import { plotHealth } from './plotHealth.js';
import { distanceVector, squaredDistance, collisionRadius } from './entity.js';
import { addVectors, multiplyVector, normalizeVector } from './vector.js';
import { dashDuration } from './dash.js';
import {
  specialCastingTime,
  specialRadius,
  lightSpecialMultiplier,
  specialDuration,
} from './special.js';
import { enemyAccelerationConstant, spawnEnemy } from './enemy.js';
import updateCharacterAnimation from './updateCharacterAnimation.js';
import { enemyDeath, lossHealthSfx, shroudMusic } from './audio/openSounds.js';
import { playSfx } from './audio/playSounds.js';
import { partition, randomElement } from './tools.js';
import { scoreOneKill } from './score.js';
import updateEnemyAnimation from './updateEnemyAnimation.js';

const resistanceConstant = 100 / 1000;
const minSpeed = 0.03;

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

const updatePosition = (entity, collidables, timeDelta) => {
  if (!entity.speed || entity.specialing) return entity;
  const futureEntity = {
    ...entity,
    position: addVectors(
      entity.position,
      multiplyVector(timeDelta, entity.speed)
    ),
  };

  const colliding = collidables.some((collidable) =>
    collisionRadius(futureEntity, collidable)
  );

  return colliding ? entity : futureEntity;
};

const updateEnemyAcceleration = (enemy, characterPos, timeDelta) => {
  const vectorToCharacter = distanceVector(characterPos, enemy);
  const normVectorToCharacter = normalizeVector(vectorToCharacter);

  return {
    ...enemy,
    acceleration: multiplyVector(
      enemyAccelerationConstant * timeDelta,
      normVectorToCharacter
    ),
  };
};

const shroudShrinkSpeed = 1 / 100000;

const updateShroud = (state, timeDelta, currentTime) => {
  return {
    ...state,
    shroudRadius: Math.max(
      state.shroudRadius -
        shroudShrinkSpeed *
          (currentTime - state.startTime) *
          Math.log(state.shroudRadius / 1000 + 1) *
          timeDelta,
      0
    ),
  };
};

const damage = 1;

const hitCharacter = (state, currentTime) => {
  const newHealth = state.character.health - damage;
  plotHealth(newHealth);
  playSfx(lossHealthSfx);
  return (state = {
    ...state,
    character: {
      ...state.character,
      lastInvulnerability: currentTime,
      lastHit: currentTime,
      // health: newHealth,
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
  if (!state.character.dashing) return state;
  if (currentTime - state.character.lastDash < dashDuration) return state;

  return {
    ...state,
    character: {
      ...state.character,
      dashing: false,
      dashHits: 0,
      acceleration: { x: 0, y: 0 },
    },
  };
};

const applyDashDamage = (state, currentTime) => {
  const [enemiesHit, enemiesNotHit] = partition(state.enemies, (enemy) =>
    radiusCollision(enemy, state.character)
  );

  if (enemiesHit.length === 0) return state;

  playSfx(randomElement(enemyDeath));

  const scoreIncrement = scoreOneKill(state.character.dashHits + 1);

  state.shroudRadius += enemiesHit.length * 100;
  state.score += scoreIncrement;
  document.getElementById('score').innerHTML = state.score;

  state.character.dashHits += enemiesHit.length;
  const updatedEnemiesHit = enemiesHit.map((enemy) => ({
    ...enemy,
    lastHit: currentTime,
  }));

  return {
    ...state,
    character: {
      ...state.character,
      specialPool: state.character.specialPool + scoreIncrement,
    },
    enemies: enemiesNotHit,
    dyingEntities: [...state.dyingEntities, ...updatedEnemiesHit],
  };
};

const updateShroudVolume = (position, shroudRadius) => {
  const distToCenter = position.x * position.x + position.y * position.y;
  const level = Math.min(
    Math.max((distToCenter / (shroudRadius * shroudRadius) - 0.5) * 2.5, 0),
    1
  );
  shroudMusic.volume = level;
};

const removeDeadEntites = (dyingEntites, currentTime) => {
  return dyingEntites.filter((entity) => currentTime - entity.lastHit < 120);
};

const inSpecialRadius = (entity, character) => {
  const d2 = squaredDistance(entity, character);
  return d2 < specialRadius * specialRadius;
};

const applySpecialDamage = (state, currentTime) => {
  const [enemiesHit, enemiesNotHit] = partition(state.enemies, (enemy) =>
    inSpecialRadius(enemy, state.character)
  );

  if (enemiesHit.length === 0) return state;

  playSfx(randomElement(enemyDeath));

  const scoreIncrement = scoreOneKill(state.character.specialHits + 1);

  state.shroudRadius += scoreIncrement * 100;
  state.score += scoreIncrement;
  document.getElementById('score').innerHTML = state.score;

  state.character.dashHits += enemiesHit.length;
  const updatedEnemiesHit = enemiesHit.map((enemy) => ({
    ...enemy,
    lastHit: currentTime,
  }));

  return {
    ...state,
    enemies: enemiesNotHit,
    dyingEntities: [...state.dyingEntities, ...updatedEnemiesHit],
  };
};

const applySpecial = (state, currentTime) => {
  console.log('test');
  if (currentTime - state.character.lastSpecial < specialCastingTime)
    return state;
  if (currentTime - state.character.lastSpecial > specialDuration) {
    return { ...state, character: { ...state.character, specialing: false } };
  }
  state = applySpecialDamage(state, currentTime);
  return { ...state, character: { ...state.character, specialPool: 0 } };
};

const invulnerabilityTime = 1 * 1000;
const spawnTimer = 10000;

const updateState = (state, timeDelta, currentTime) => {
  updateShroudVolume(state.character.position, state.shroudRadius);
  state = resetDash(state, currentTime);
  state.character = updateSpeed(state.character, timeDelta);
  state.character = updatePosition(state.character, state.obstacles, timeDelta);

  state.character = updateCharacterAnimation(state.character, currentTime);

  state.enemies = state.enemies.map((enemy, index) => {
    enemy = updateEnemyAcceleration(enemy, state.character, timeDelta);
    enemy = updateSpeed(enemy, timeDelta);
    enemy = updateEnemyAnimation(enemy);
    const collidables = [
      ...state.obstacles,
      ...state.enemies.toSpliced(index, 1),
    ];
    return updatePosition(enemy, collidables, timeDelta);
  });

  state.dyingEntities = removeDeadEntites(state.dyingEntities, currentTime);
  state = state.character.dashing ? applyDashDamage(state, currentTime) : state;
  state = state.character.specialing ? applySpecial(state, currentTime) : state;

  state =
    currentTime - state.lastSpawn >
    spawnTimer / Math.log(currentTime - state.startTime)
      ? spawnEnemy(state, currentTime)
      : state;
  state = updateShroud(state, timeDelta, currentTime); // TODO: fixe crasg bug, add expension with enemies death
  return currentTime - state.character.lastInvulnerability < invulnerabilityTime
    ? state
    : applyEnemyDamage(state, currentTime);
};
export default updateState;
