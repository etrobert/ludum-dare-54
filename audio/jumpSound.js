const audioCtx = new AudioContext();
const jumpSound = document.querySelector('#jump-sound');
const track = audioCtx.createMediaElementSource(jumpSound);
track.connect(audioCtx.destination);

const playJumpSound = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  jumpSound.play();
};

export { playJumpSound };
