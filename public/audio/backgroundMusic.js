const audioCtx = new AudioContext();
const backgroundMusic = document.querySelector('#game-music');
const track = audioCtx.createMediaElementSource(backgroundMusic);
track.connect(audioCtx.destination);

const playMusic = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  backgroundMusic.play();
};

const pauseMusic = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  backgroundMusic.pause();
};

export { playMusic, pauseMusic };
