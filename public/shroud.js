import { backgroundEntity } from './background.js';
import { canvas, ctx } from './graphics.js';
import { getScreenPos } from './screen-pos.js';

const startShroud = (state) => {
  const radius = state.shroudRadius;
  const { x: cx, y: cy } = getScreenPos(
    {
      position: { x: 0, y: 0 },
      size: { x: 0, y: 0 },
    },
    state.character
  );
  const radialGradient = ctx.createRadialGradient(cx, cy, 1, cx, cy, radius);
  radialGradient.addColorStop(0, 'rgba(0,0,0,1)');
  radialGradient.addColorStop(0.65, 'rgba(0,0,0,1)');
  radialGradient.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fillStyle = radialGradient;
  ctx.fill();
  ctx.globalCompositeOperation = 'source-atop';
};

const endShroud = () => {
  ctx.globalCompositeOperation = 'destination-over';
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

export { startShroud, endShroud };
