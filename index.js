const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let state = {
  position: {
    x: 10,
    y: 10,
  },
  speed: {
    x: 0, // px per ms
    y: 10 / 1000, // px per ms
  },
};

const characterSize = 20;

const render = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  ctx.fillRect(
    state.position.x,
    state.position.y,
    characterSize,
    characterSize
  );
};

const updateState = (state, timeDelta) => {
  return {
    ...state,
    position: {
      x: state.position.x + state.speed.x * timeDelta,
      y: state.position.y + state.speed.y * timeDelta,
    },
  };
};

let previousTime = Date.now();

const gameLoop = () => {
  const currentTime = Date.now();
  const timeDelta = currentTime - previousTime;
  previousTime = currentTime;

  state = updateState(state, timeDelta);

  render();
};

setInterval(gameLoop, 60);
