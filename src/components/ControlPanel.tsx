import React from 'react';
import { useAppStore, DatasetType, ActivationType } from '../store/useAppStore';
import { Plus, Minus, Database, Cpu, Settings2, Code, Check } from 'lucide-react';
import { useState } from 'react';

export const ControlPanel: React.FC = () => {
  const [codeCopied, setCodeCopied] = useState(false);
  const {
    datasetType, setDatasetType,
    noise, setNoise,
    trainTestSplit, setTrainTestSplit,
    sampleCount, setSampleCount,
    hiddenLayers, setHiddenLayers,
    activation, setActivation,
    learningRate, setLearningRate,
    batchSize, setBatchSize,
    regularization, setRegularization,
    dropoutRate, setDropoutRate
  } = useAppStore();

  const addLayer = () => {
    if (hiddenLayers.length < 3) {
      setHiddenLayers([...hiddenLayers, 4]);
    }
  };

  const removeLayer = () => {
    if (hiddenLayers.length > 1) {
      setHiddenLayers(hiddenLayers.slice(0, -1));
    }
  };

  const updateLayerSize = (idx: number, size: number) => {
    if (isNaN(size)) return;
    const newLayers = [...hiddenLayers];
    newLayers[idx] = Math.max(1, Math.min(8, size));
    setHiddenLayers(newLayers);
  };

  const exportCode = () => {
    const layersCode = hiddenLayers.map((size, i) => {
      let layer = `  model.add(tf.layers.dense({ units: ${size}, activation: '${activation}'${i === 0 ? ", inputShape: [2]" : ""} }));`;
      if (dropoutRate > 0) {
        layer += `\n  model.add(tf.layers.dropout({ rate: ${dropoutRate} }));`;
      }
      return layer;
    }).join('\n');

    const code = `
// TensorFlow.js Code for this Architecture
const model = tf.sequential();

${layersCode}
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

model.compile({
  optimizer: tf.train.adam(${learningRate}),
  loss: 'binaryCrossentropy',
  metrics: ['accuracy']
});
    `.trim();

    navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 p-6 h-full overflow-y-auto bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
      {/* Dataset Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
          <Database size={18} />
          <h2>Dataset</h2>
        </div>
        
        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Type</label>
          <select 
            value={datasetType}
            onChange={(e) => setDatasetType(e.target.value as DatasetType)}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="circle">Circle</option>
            <option value="xor">XOR</option>
            <option value="gaussian">Gaussian</option>
            <option value="spiral">Spiral</option>
            <option value="checkerboard">Checkerboard</option>
            <option value="moons">Two Moons</option>
          </select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Noise</label>
            <span className="text-xs font-mono">{noise.toFixed(2)}</span>
          </div>
          <input 
            type="range" min="0" max="0.5" step="0.01" value={noise}
            onChange={(e) => setNoise(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Train/Test Split</label>
            <span className="text-xs font-mono">{Math.round(trainTestSplit * 100)}%</span>
          </div>
          <input 
            type="range" min="0.5" max="0.9" step="0.05" value={trainTestSplit}
            onChange={(e) => setTrainTestSplit(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Sample Count</label>
          <input 
            type="number" value={isNaN(sampleCount) ? '' : sampleCount}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) setSampleCount(val);
            }}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </section>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* Model Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
          <Cpu size={18} />
          <h2>Architecture</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Hidden Layers</label>
            <div className="flex gap-1">
              <button 
                onClick={removeLayer}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
              >
                <Minus size={14} />
              </button>
              <button 
                onClick={addLayer}
                className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
          
          <div className="flex gap-2">
            {hiddenLayers.map((size, i) => (
              <div key={i} className="flex-1 space-y-1">
                <input 
                  type="number" value={isNaN(size) ? '' : size}
                  onChange={(e) => updateLayerSize(i, parseInt(e.target.value))}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-2 py-1.5 text-center text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div className="text-[10px] text-center text-zinc-400">L{i+1}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Activation</label>
          <select 
            value={activation}
            onChange={(e) => setActivation(e.target.value as ActivationType)}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="tanh">Tanh</option>
            <option value="relu">ReLU</option>
            <option value="sigmoid">Sigmoid</option>
            <option value="linear">Linear</option>
          </select>
        </div>

        <button 
          onClick={exportCode}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 rounded-lg transition-all text-xs font-semibold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
        >
          {codeCopied ? <Check size={14} className="text-emerald-500" /> : <Code size={14} />}
          {codeCopied ? 'Code Copied!' : 'Export TF.js Code'}
        </button>
      </section>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800" />

      {/* Hyperparams Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-semibold">
          <Settings2 size={18} />
          <h2>Hyperparameters</h2>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Learning Rate</label>
            <span className="text-xs font-mono">{learningRate}</span>
          </div>
          <input 
            type="range" min="0.001" max="0.1" step="0.001" value={learningRate}
            onChange={(e) => setLearningRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider">Batch Size</label>
          <input 
            type="number" value={isNaN(batchSize) ? '' : batchSize}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) setBatchSize(val);
            }}
            className="w-full bg-zinc-100 dark:bg-zinc-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Regularization (L2)</label>
            <span className="text-xs font-mono">{regularization}</span>
          </div>
          <input 
            type="range" min="0" max="0.1" step="0.001" value={regularization}
            onChange={(e) => setRegularization(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wider">Dropout Rate</label>
            <span className="text-xs font-mono">{Math.round(dropoutRate * 100)}%</span>
          </div>
          <input 
            type="range" min="0" max="0.5" step="0.01" value={dropoutRate}
            onChange={(e) => setDropoutRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </section>
    </div>
  );
};
