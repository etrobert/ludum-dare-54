import { AudioCtx } from './openSounds.js';
let currentMusic;

const playMusic = (music) => {
  if (AudioCtx.state === 'suspended') {
    AudioCtx.resume();
  }
  music.play();
};

const pauseMusic = (music) => {
  if (AudioCtx.state === 'suspended') {
    AudioCtx.resume();
  }
  music.pause();
};

const changeMusic = (music) => {
  if (currentMusic !== undefined) pauseMusic(currentMusic);
  currentMusic = music;
  playMusic(music);
};

const playSfx = (sfx) => {
  if (AudioCtx.state === 'suspended') {
    AudioCtx.resume();
  }
  sfx.cloneNode(true).play();
};

export { changeMusic, playSfx };
