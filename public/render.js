import { ctx, canvas } from './graphics.js';
import { startShroud, endShroud } from './shroud.js';
import { getScreenPos } from './screen-pos.js';
import { backgroundEntity } from './background.js';

ctx.imageSmoothingEnabled = false;

const timePerFrame = 100; // ms

const getCurrentFrame = (entity, time) =>
  Math.floor((time - (entity.animationStart ?? 0)) / timePerFrame) %
  entity.display.animationFrames;

const drawDisplayableEntity = (entity, time, screenPos) => {
  ctx.drawImage(
    entity.display.image,
    entity.display.sw * getCurrentFrame(entity, time),
    0,
    entity.display.sw,
    entity.display.sh,
    screenPos.x,
    screenPos.y,
    entity.size.x,
    entity.size.y
  );
};

const renderEntity = (entity, state, time) => {
  const screenPos = getScreenPos(entity, state.character);
  if (entity.display) drawDisplayableEntity(entity, time, screenPos);
  else ctx.fillRect(screenPos.x, screenPos.y, entity.size.x, entity.size.y);
};

const render = (state, time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startShroud(state);

  ctx.fillStyle = 'green';
  [
    backgroundEntity,
    state.character,
    ...state.obstacles,
    ...state.enemies,
  ].forEach((entity) => renderEntity(entity, state, time));

  endShroud();
};

export default render;
