const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const scale = 2.5;

const render = (state) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  state.map((entity) =>
    ctx.fillRect(
      entity.position.x * scale,
      entity.position.y * scale,
      entity.size.x * scale,
      entity.size.y * scale
    )
  );
};

export default render;
