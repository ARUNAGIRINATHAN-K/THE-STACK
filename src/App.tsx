import React, { useEffect, useState } from 'react';
import { useAppStore } from './store/useAppStore';
import { ControlPanel } from './components/ControlPanel';
import { VisualizationCanvas } from './components/VisualizationCanvas';
import { NetworkDiagram } from './components/NetworkDiagram';
import { MetricsPanel } from './components/MetricsPanel';
import { TrainingControls } from './components/TrainingControls';
import { buildModel } from './ml/modelBuilder';
import { predictAllLayers } from './utils/gridPrediction';
import { 
  generateCircleData, 
  generateXORData, 
  generateGaussianData, 
  generateSpiralData, 
  generateCheckerboardData,
  generateMoonsData,
  shuffle 
} from './ml/datasets';
import { Brain, Moon, Sun, Github, Share2, Check } from 'lucide-react';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const {
    datasetType, noise, trainTestSplit, sampleCount,
    hiddenLayers, activation, learningRate, regularization, dropoutRate,
    setDataset, setModel, updateWeights, setIsTraining, resetMetrics, setActivations,
    serializeState, loadFromUrl
  } = useAppStore();

  // Handle Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle URL Load
  useEffect(() => {
    loadFromUrl();
  }, []);

  // Handle Dataset Changes
  useEffect(() => {
    let rawData;
    switch (datasetType) {
      case 'circle': rawData = generateCircleData(sampleCount, noise); break;
      case 'xor': rawData = generateXORData(sampleCount, noise); break;
      case 'gaussian': rawData = generateGaussianData(sampleCount, noise); break;
      case 'spiral': rawData = generateSpiralData(sampleCount, noise); break;
      case 'checkerboard': rawData = generateCheckerboardData(sampleCount, noise); break;
      case 'moons': rawData = generateMoonsData(sampleCount, noise); break;
      default: rawData = generateCircleData(sampleCount, noise);
    }

    const shuffled = shuffle([...rawData]);
    const splitIdx = Math.floor(shuffled.length * trainTestSplit);
    const train = shuffled.slice(0, splitIdx);
    const test = shuffled.slice(splitIdx);

    setDataset(train, test);
    setIsTraining(false);
    resetMetrics();
  }, [datasetType, noise, trainTestSplit, sampleCount]);

  // Handle Model Rebuild
  useEffect(() => {
    const model = buildModel(hiddenLayers, activation, learningRate, regularization, dropoutRate);
    setModel(model);
    updateWeights();
    
    // Initial activations
    predictAllLayers(model).then(({ activations }) => {
      setActivations(activations);
    });

    setIsTraining(false);
    resetMetrics();
    
    return () => {
      model.dispose();
    };
  }, [hiddenLayers, activation, learningRate, regularization, dropoutRate]);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors">
      {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <Brain size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Tensor canvas</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => {
                const hash = serializeState();
                window.location.hash = hash;
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all text-sm font-medium shadow-md shadow-blue-500/20"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              {copied ? 'Copied!' : 'Share'}
            </button>

            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer"
              className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <Github size={20} />
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 overflow-hidden">
          {/* Left Panel */}
          <aside className="w-72 shrink-0">
            <ControlPanel />
          </aside>

          {/* Center Panel */}
          <div className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full space-y-6">
              <VisualizationCanvas />
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-zinc-500 uppercase tracking-wider px-1">Network Architecture</h3>
                <NetworkDiagram />
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <aside className="w-80 shrink-0">
            <MetricsPanel />
          </aside>
        </main>

        {/* Bottom Bar */}
        <footer className="shrink-0">
          <TrainingControls />
        </footer>
      </div>
  );
};

export default App;
