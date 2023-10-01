import { AudioCtx } from './openSounds.js';
let currentMusics;

const playMusic = (music) => {
  if (AudioCtx.state === 'suspended') {
    AudioCtx.resume();
  }
  music.play();
  music.loop = true;
};

const pauseMusic = (music) => {
  if (AudioCtx.state === 'suspended') {
    AudioCtx.resume();
  }
  music.pause();
};

const changeMusic = (musics) => {
  if (currentMusics !== undefined) currentMusics.forEach(pauseMusic);
  currentMusics = musics;
  musics.forEach(playMusic);
};

const playSfx = (sfx) => {
  if (AudioCtx.state === 'suspended') {
    AudioCtx.resume();
  }
  // sfx.cloneNode(true).play();
  sfx.play();
};

export { changeMusic, playSfx };
