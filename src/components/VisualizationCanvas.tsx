import React, { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';
import { predictGrid } from '../utils/gridPrediction';

export const VisualizationCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { model, trainData, testData, epoch } = useAppStore();
  const animationRef = useRef<number>(0);

  const draw = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const range = 6;

    const toCanvasX = (x: number) => ((x + range) / (range * 2)) * width;
    const toCanvasY = (y: number) => ((-y + range) / (range * 2)) * height;

    // Clear
    ctx.clearRect(0, 0, width, height);

    // Draw Decision Boundary
    if (model) {
      const resolution = 60;
      const { values } = await predictGrid(model, resolution);
      const stepX = width / resolution;
      const stepY = height / resolution;

      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const val = values[i * resolution + j];
          if (val === undefined) continue;
          
          // val is 0 to 1. Map to colors.
          // 0 = orange, 1 = blue
          const r = Math.floor(255 * (1 - val) + 50 * val);
          const g = Math.floor(150 * (1 - val) + 150 * val);
          const b = Math.floor(50 * (1 - val) + 255 * val);
          
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.4)`;
          ctx.fillRect(j * stepX, i * stepY, stepX + 1, stepY + 1);
        }
      }
    }

    // Draw Axes
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.2)';
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();

    // Draw Data Points
    const drawPoint = (p: any, isTest: boolean) => {
      const x = toCanvasX(p.x[0]);
      const y = toCanvasY(p.x[1]);
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 1 ? '#3b82f6' : '#f97316';
      ctx.globalAlpha = isTest ? 0.4 : 1.0;
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1.0;
    };

    trainData.forEach(p => drawPoint(p, false));
    testData.forEach(p => drawPoint(p, true));
  };

  useEffect(() => {
    const render = () => {
      draw();
      // We don't necessarily need requestAnimationFrame if we only update on epoch
    };
    render();
  }, [model, trainData, testData, epoch]);

  return (
    <div className="relative w-full aspect-square bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-inner border border-zinc-200 dark:border-zinc-800">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        className="w-full h-full"
      />
      <div className="absolute top-4 left-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur px-3 py-1 rounded-full text-xs font-mono border border-zinc-200 dark:border-zinc-700">
        Decision Boundary
      </div>
    </div>
  );
};
