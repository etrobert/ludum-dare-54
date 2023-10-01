import { ctx, scale, canvas } from './graphics.js';
import { startShroud, endShroud } from './shroud.js';
import { getScreenPos } from './screen-pos.js';
import { backgroundImage, backgroundEntity } from './background.js';

ctx.imageSmoothingEnabled = false;

const timePerFrame = 100; // ms

const drawDisplayableEntity = (entity, time, screenPos) => {
  ctx.drawImage(
    entity.display.image,
    entity.display.sw *
      (Math.floor(time / timePerFrame) % entity.display.animationFrames),
    0,
    entity.display.sw,
    entity.display.sh,
    screenPos.x,
    screenPos.y,
    entity.size.x * scale,
    entity.size.y * scale
  );
};

const renderEntity = (entity, state, time) => {
  const screenPos = getScreenPos(entity, state.character);
  if (entity.display) {
    drawDisplayableEntity(entity, time, screenPos);
  } else
    ctx.fillRect(
      screenPos.x,
      screenPos.y,
      entity.size.x * scale,
      entity.size.y * scale
    );
};

const render = (state, time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // startShroud(state);

  const backgroundScreenPosition = getScreenPos(
    backgroundEntity,
    state.character
  );
  ctx.drawImage(
    backgroundImage,
    backgroundScreenPosition.x,
    backgroundScreenPosition.y
  );
  drawDisplayableEntity(
    state.character,
    time,
    getScreenPos(state.character, state.character)
  );
  ctx.fillStyle = 'green';
  state.obstacles.forEach((entity) => renderEntity(entity, state, time));
  state.enemies.forEach((entity) => renderEntity(entity, state, time));

  // endShroud();
};

export default render;
