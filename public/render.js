import { ctx, canvas } from './graphics.js';
import { startShroud, endShroud } from './shroud.js';
import { rangeAB, combination } from './tools.js';
import { multiplyVector2D } from './vector.js';
import { getScreenPos } from './screen-pos.js';
import { stoneTileSize, createStoneTileEntity } from './background.js';

ctx.imageSmoothingEnabled = false;

const timePerFrame = 100; // ms

const drawHitbox = (entity, state) => {
  const pos = getScreenPos(
    { position: entity.position, size: { x: 0, y: 0 } },
    state.character
  );
  ctx.arc(pos.x, pos.y, entity.hitBoxRadius, 0, 2 * Math.PI);
  ctx.stroke();
};

const getCurrentFrame = (entity, time) =>
  Math.floor((time - (entity.animationStart ?? 0)) / timePerFrame) %
  entity.display.animationFrames;

const drawDisplayableEntity = (entity, time, screenPos) => {
  ctx.save();
  if (entity.lastHit && time - entity.lastHit < 150)
    ctx.filter = 'brightness(1000%)';
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
  ctx.restore();
};

const renderEntity = (entity, state, time) => {
  const screenPos = getScreenPos(entity, state.character);
  if (entity.display) drawDisplayableEntity(entity, time, screenPos);
  else ctx.fillRect(screenPos.x, screenPos.y, entity.size.x, entity.size.y);
};

const getBackgroundsEntities = (character) => {
  const nMinX = Math.ceil(
    (character.position.x - canvas.width * 0.5) / stoneTileSize.x - 0.5
  );
  const nMaxX = Math.ceil(
    (character.position.x + canvas.width * 0.5) / stoneTileSize.x + 0.5
  );
  const rangeX = rangeAB(nMinX, nMaxX + 1);
  const nMinY = Math.ceil(
    (character.position.y - canvas.height * 0.5) / stoneTileSize.y - 0.5
  );
  const nMaxY = Math.ceil(
    (character.position.y + canvas.height * 0.5) / stoneTileSize.y + 0.5
  );
  const rangeY = rangeAB(nMinY, nMaxY + 1);
  const listPos = combination(rangeX, rangeY);
  console.log(listPos);
  const test = listPos
    .map(([x, y]) => ({ x, y }))
    .map((pos) => multiplyVector2D(stoneTileSize, pos));
  console.log(test);
  return listPos
    .map(([x, y]) => ({ x, y }))
    .map((pos) => multiplyVector2D(stoneTileSize, pos))
    .map(createStoneTileEntity);
};

const render = (state, time) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  startShroud(state);
  ctx.fillStyle = 'green';
  [
    ...getBackgroundsEntities(state.character),
    state.character,
    ...state.obstacles,
    ...state.enemies,
    ...state.dyingEntities,
  ].forEach((entity) => renderEntity(entity, state, time));

  endShroud();
};

export default render;
