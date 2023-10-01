const audioCtx = new AudioContext();
const gameMusic = document.querySelector('#game-music');
const track = audioCtx.createMediaElementSource(gameMusic);
track.connect(audioCtx.destination);

const playMusic = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  gameMusic.play();
};

const pauseMusic = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  gameMusic.pause();
};

export { playMusic, pauseMusic };
