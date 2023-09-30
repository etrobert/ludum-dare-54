import { addVectors, multiplyVector } from './vector.js';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const scale = 2;

const backgroundImage = new Image();
backgroundImage.src = 'assets/images/backgrounds/sea-world.png';

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

const getCharacterScreenPos = (character) => ({
  x: canvas.width / 2 - (character.size.x * scale) / 2,
  y: canvas.height / 2 - (character.size.y * scale) / 2,
});

const getScreenPos = (entity, character) => {
  const characterScreenPos = getCharacterScreenPos(character);

  return addVectors(
    multiplyVector(scale, entity.position),
    characterScreenPos,
    multiplyVector(-scale, character.position)
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
  ctx.drawImage(
    backgroundImage,
    100 - state.character.position.x * scale,
    100 - state.character.position.y * scale
  );
  drawDisplayableEntity(
    state.character,
    time,
    getCharacterScreenPos(state.character)
  );
  ctx.fillStyle = 'green';
  state.obstacles.forEach((entity) => renderEntity(entity, state, time));
};

export default render;
