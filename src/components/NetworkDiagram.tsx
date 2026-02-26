import React, { useEffect, useRef, useState } from 'react';
import { useAppStore } from '../store/useAppStore';

interface HoveredNode {
  layerIdx: number;
  nodeIdx: number;
  x: number;
  y: number;
}

export const NetworkDiagram: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const { hiddenLayers, weights, epoch, activations } = useAppStore();
  const [hoveredNode, setHoveredNode] = useState<HoveredNode | null>(null);

  const layers = [2, ...hiddenLayers, 1];
  const nodeSize = 24; // Square size

  const getNodePos = (layerIdx: number, nodeIdx: number, width: number, height: number) => {
    const layerCount = layers.length;
    const layerSpacing = width / (layerCount + 1);
    const x = (layerIdx + 1) * layerSpacing;
    const nodesInLayer = layers[layerIdx];
    const totalHeight = (nodesInLayer - 1) * 48;
    const startY = (height - totalHeight) / 2;
    const y = startY + nodeIdx * 48;
    return { x, y };
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw Grid Background
    ctx.strokeStyle = 'rgba(113, 113, 122, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const layerCount = layers.length;
    
    // Draw Connections (Curved Patch Cables)
    for (let i = 0; i < layerCount - 1; i++) {
      const nodesCurrent = layers[i];
      const nodesNext = layers[i + 1];
      const layerWeights = weights[i];

      for (let j = 0; j < nodesCurrent; j++) {
        for (let k = 0; k < nodesNext; k++) {
          const start = getNodePos(i, j, width, height);
          const end = getNodePos(i + 1, k, width, height);
          
          let weightVal = 0;
          if (layerWeights && layerWeights[0] && layerWeights[0][j] && layerWeights[0][j][k] !== undefined) {
            weightVal = layerWeights[0][j][k];
          }

          const absWeight = Math.abs(weightVal);
          const opacity = Math.min(absWeight * 0.4 + 0.1, 0.6);
          
          ctx.beginPath();
          ctx.moveTo(start.x + nodeSize/2, start.y);
          
          // Bezier curve for patch cable look
          const cp1x = start.x + (end.x - start.x) / 2;
          const cp2x = start.x + (end.x - start.x) / 2;
          ctx.bezierCurveTo(cp1x, start.y, cp2x, end.y, end.x - nodeSize/2, end.y);
          
          ctx.strokeStyle = weightVal > 0 
            ? `rgba(59, 130, 246, ${opacity})`
            : `rgba(239, 68, 68, ${opacity})`;
          
          ctx.lineWidth = Math.min(absWeight * 2 + 0.5, 6);
          ctx.stroke();
        }
      }
    }

    // Draw Nodes (Modular Blocks)
    layers.forEach((nodeCount, layerIdx) => {
      const layerActivations = activations[layerIdx - 1];
      
      // Layer Label
      const firstPos = getNodePos(layerIdx, 0, width, height);
      ctx.fillStyle = '#71717a';
      ctx.font = 'bold 9px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(
        layerIdx === 0 ? 'INPUT' : layerIdx === layerCount - 1 ? 'OUTPUT' : `HIDDEN ${layerIdx}`,
        firstPos.x,
        25
      );

      for (let i = 0; i < nodeCount; i++) {
        const { x, y } = getNodePos(layerIdx, i, width, height);
        
        // Node Container (Rounded Rect)
        const radius = 4;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x - nodeSize/2 + radius, y - nodeSize/2);
        ctx.lineTo(x + nodeSize/2 - radius, y - nodeSize/2);
        ctx.quadraticCurveTo(x + nodeSize/2, y - nodeSize/2, x + nodeSize/2, y - nodeSize/2 + radius);
        ctx.lineTo(x + nodeSize/2, y + nodeSize/2 - radius);
        ctx.quadraticCurveTo(x + nodeSize/2, y + nodeSize/2, x + nodeSize/2 - radius, y + nodeSize/2);
        ctx.lineTo(x - nodeSize/2 + radius, y + nodeSize/2);
        ctx.quadraticCurveTo(x - nodeSize/2, y + nodeSize/2, x - nodeSize/2, y + nodeSize/2 - radius);
        ctx.lineTo(x - nodeSize/2, y - nodeSize/2 + radius);
        ctx.quadraticCurveTo(x - nodeSize/2, y - nodeSize/2, x - nodeSize/2 + radius, y - nodeSize/2);
        ctx.closePath();
        ctx.clip();

        // Draw Heatmap
        if ((layerIdx > 0 && layerActivations) || layerIdx === 0) {
          const resolution = 20;
          const pixelSize = nodeSize / resolution;
          
          for (let r = 0; r < resolution; r++) {
            for (let c = 0; c < resolution; c++) {
              let val = 0;
              if (layerIdx > 0) {
                const valIdx = (r * resolution + c) * nodeCount + i;
                val = layerActivations[valIdx];
              } else {
                const range = 6;
                const valRaw = i === 0 
                  ? (-range + (c / resolution) * range * 2)
                  : (range - (r / resolution) * range * 2);
                val = (valRaw + range) / (range * 2);
              }
              
              const rCol = Math.floor(255 * (1 - val) + 50 * val);
              const gCol = Math.floor(150 * (1 - val) + 150 * val);
              const bCol = Math.floor(50 * (1 - val) + 255 * val);
              
              ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
              ctx.fillRect(x - nodeSize/2 + c * pixelSize, y - nodeSize/2 + r * pixelSize, pixelSize + 0.5, pixelSize + 0.5);
            }
          }
        } else {
          ctx.fillStyle = '#fff';
          ctx.fill();
        }
        ctx.restore();

        // Node Border
        ctx.beginPath();
        ctx.moveTo(x - nodeSize/2 + radius, y - nodeSize/2);
        ctx.lineTo(x + nodeSize/2 - radius, y - nodeSize/2);
        ctx.quadraticCurveTo(x + nodeSize/2, y - nodeSize/2, x + nodeSize/2, y - nodeSize/2 + radius);
        ctx.lineTo(x + nodeSize/2, y + nodeSize/2 - radius);
        ctx.quadraticCurveTo(x + nodeSize/2, y + nodeSize/2, x + nodeSize/2 - radius, y + nodeSize/2);
        ctx.lineTo(x - nodeSize/2 + radius, y + nodeSize/2);
        ctx.quadraticCurveTo(x - nodeSize/2, y + nodeSize/2, x - nodeSize/2, y + nodeSize/2 - radius);
        ctx.lineTo(x - nodeSize/2, y - nodeSize/2 + radius);
        ctx.quadraticCurveTo(x - nodeSize/2, y - nodeSize/2, x - nodeSize/2 + radius, y - nodeSize/2);
        ctx.closePath();
        
        const isHovered = hoveredNode?.layerIdx === layerIdx && hoveredNode?.nodeIdx === i;
        ctx.strokeStyle = isHovered ? '#2563eb' : '#3f3f46';
        ctx.lineWidth = isHovered ? 2 : 1.5;
        ctx.stroke();
        
        // Port indicators
        ctx.fillStyle = isHovered ? '#2563eb' : '#3f3f46';
        if (layerIdx < layerCount - 1) {
          ctx.beginPath();
          ctx.arc(x + nodeSize/2, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        if (layerIdx > 0) {
          ctx.beginPath();
          ctx.arc(x - nodeSize/2, y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    });
  };

  const drawPreview = () => {
    if (!hoveredNode || !previewCanvasRef.current) return;
    const canvas = previewCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const resolution = 20;
    const pixelSize = size / resolution;
    const { layerIdx, nodeIdx } = hoveredNode;
    const layerActivations = activations[layerIdx - 1];
    const nodeCount = layers[layerIdx];

    ctx.clearRect(0, 0, size, size);

    for (let r = 0; r < resolution; r++) {
      for (let c = 0; c < resolution; c++) {
        let val = 0;
        if (layerIdx > 0 && layerActivations) {
          const valIdx = (r * resolution + c) * nodeCount + nodeIdx;
          val = layerActivations[valIdx];
        } else if (layerIdx === 0) {
          const range = 6;
          const valRaw = nodeIdx === 0 
            ? (-range + (c / resolution) * range * 2)
            : (range - (r / resolution) * range * 2);
          val = (valRaw + range) / (range * 2);
        }
        
        const rCol = Math.floor(255 * (1 - val) + 50 * val);
        const gCol = Math.floor(150 * (1 - val) + 150 * val);
        const bCol = Math.floor(50 * (1 - val) + 255 * val);
        
        ctx.fillStyle = `rgb(${rCol}, ${gCol}, ${bCol})`;
        ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize + 0.5, pixelSize + 0.5);
      }
    }
  };

  useEffect(() => {
    draw();
  }, [hiddenLayers, weights, epoch, activations, hoveredNode]);

  useEffect(() => {
    drawPreview();
  }, [hoveredNode, activations]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    let found = false;
    layers.forEach((nodeCount, layerIdx) => {
      for (let i = 0; i < nodeCount; i++) {
        const { x, y } = getNodePos(layerIdx, i, canvas.width, canvas.height);
        const dist = Math.max(Math.abs(mx - x), Math.abs(my - y));
        if (dist < nodeSize/2 + 5) {
          setHoveredNode({ layerIdx, nodeIdx: i, x: e.clientX, y: e.clientY });
          found = true;
          break;
        }
      }
    });

    if (!found) setHoveredNode(null);
  };

  return (
    <div className="relative w-full h-80 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden group shadow-inner">
      <canvas 
        ref={canvasRef} 
        width={800} 
        height={320} 
        className="w-full h-full cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredNode(null)}
      />

      {hoveredNode && (
        <div 
          className="fixed z-50 pointer-events-none bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3 rounded-xl shadow-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2"
          style={{ 
            left: hoveredNode.x + 20, 
            top: hoveredNode.y - 80 
          }}
        >
          <div className="flex justify-between items-center gap-4 px-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 font-mono">
              {hoveredNode.layerIdx === 0 ? 'INPUT' : hoveredNode.layerIdx === layers.length - 1 ? 'OUTPUT' : `HIDDEN_${hoveredNode.layerIdx}`}
            </span>
            <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">N_{hoveredNode.nodeIdx + 1}</span>
          </div>
          <div className="relative">
            <canvas 
              ref={previewCanvasRef} 
              width={140} 
              height={140} 
              className="rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm"
            />
            <div className="absolute inset-0 border border-white/10 rounded-lg pointer-events-none" />
          </div>
          <div className="text-[9px] text-zinc-400 text-center font-mono uppercase tracking-tighter">
            Activation Schematic
          </div>
        </div>
      )}
      
      {/* Decorative corner elements */}
      <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700" />
      <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700" />
      <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700" />
      <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700" />
    </div>
  );
};
