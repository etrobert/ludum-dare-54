const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const gravity = {
  x: 0,
  y: 1 / 1000 / 100,
};

const character = {
  position: {
    x: 10,
    y: 10,
  },
  speed: {
    x: 0, // px per ms
    y: 0, // px per ms
  },
  acceleration: gravity,
  size: {
    x: 20,
    y: 20,
  },
};

const platform = {
  position: {
    x: 0,
    y: 100,
  },
  size: {
    x: 100,
    y: 10,
  },
};

let state = [character, platform];

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  state.map((entity) =>
    ctx.fillRect(
      entity.position.x,
      entity.position.y,
      entity.size.x,
      entity.size.y
    )
  );
};

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

const updatePosition = (entity, otherEntities, timeDelta) => {
  if (!entity.speed) return entity;

  const newPosition = {
    x: entity.position.x + entity.speed.x * timeDelta,
    y: entity.position.y + entity.speed.y * timeDelta,
  };
  const newEntity = {
    ...entity,
    position: newPosition,
  };

  const anyCollision = otherEntities.some((otherEntity) =>
    collision(otherEntity, newEntity)
  );

  return anyCollision ? entity : newEntity;
};

const updateState = (state, timeDelta) =>
  state.map((entity, index) => {
    entity = updateSpeed(entity, timeDelta);
    const otherEntities = state.toSpliced(index, 1);
    return updatePosition(entity, otherEntities, timeDelta);
  });

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state = updateState(state, timeDelta);

  render();
};

setInterval(gameLoop, 60);
