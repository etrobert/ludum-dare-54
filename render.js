const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const scale = 2.5;

const jellyfishImage = new Image();
jellyfishImage.src = 'jellyfish.png';

const render = (state) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  state.map((entity, index) => {
    if (index === 0)
      ctx.drawImage(
        jellyfishImage,
        0,
        0,
        16,
        16,
        entity.position.x * scale,
        entity.position.y * scale,
        entity.size.x * scale,
        entity.size.y * scale
      );
    else
      ctx.fillRect(
        entity.position.x * scale,
        entity.position.y * scale,
        entity.size.x * scale,
        entity.size.y * scale
      );
  });
};

export default render;
