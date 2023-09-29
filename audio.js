const audioCtx = new AudioContext();
const audioElement = document.querySelector('audio');
const track = audioCtx.createMediaElementSource(audioElement);

const playSound = () => {
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  track.connect(audioCtx.destination);
  audioElement.play();
  // setTimeout(() => audioElement.pause(), 1000);
};

const button2 = document.getElementById('button1');
button2.addEventListener('click', playSound);
