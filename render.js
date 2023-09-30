const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const scale = 2.5;

const timePerFrame = 100; // ms

const render = (state, time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'green';
  state.map((entity) => {
    if (entity.display)
      ctx.drawImage(
        entity.display.image,
        entity.display.sw *
          (Math.floor(time / timePerFrame) % entity.display.animationFrames),
        0,
        entity.display.sw,
        entity.display.sh,
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
