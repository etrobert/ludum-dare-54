const plotLight = (light) => {
  document.getElementById('light-score').innerHTML = light;
};

const plotFinalScore = (score) => {
  document.getElementById('final-score').innerHTML = score;
};

export { plotLight, plotFinalScore };
