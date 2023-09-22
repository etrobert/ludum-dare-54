const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const render = (state) => {
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

export default render;
