const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let state = [
  {
    position: {
      x: 10,
      y: 10,
    },
    speed: {
      x: 0, // px per ms
      y: 10 / 1000, // px per ms
    },
    size: {
      x: 20,
      y: 20,
    },
  },
  {
    position: {
      x: 100,
      y: 100,
    },
    speed: {
      x: 0,
      y: 0,
    },
    size: {
      x: 100,
      y: 10,
    },
  },
];

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

const updateState = (state, timeDelta) =>
  state.map((entity) => ({
    ...entity,
    position: {
      x: entity.position.x + entity.speed.x * timeDelta,
      y: entity.position.y + entity.speed.y * timeDelta,
    },
  }));

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state = updateState(state, timeDelta);

  render();
};

setInterval(gameLoop, 60);
