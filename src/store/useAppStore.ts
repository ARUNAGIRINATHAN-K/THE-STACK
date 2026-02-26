import { create } from 'zustand';
import * as tf from '@tensorflow/tfjs';

export type DatasetType = 'circle' | 'xor' | 'gaussian' | 'spiral' | 'checkerboard' | 'moons';
export type ActivationType = 'relu' | 'tanh' | 'sigmoid' | 'linear';

interface AppState {
  // Dataset Settings
  datasetType: DatasetType;
  noise: number;
  trainTestSplit: number;
  sampleCount: number;
  
  // Model Settings
  hiddenLayers: number[];
  activation: ActivationType;
  learningRate: number;
  batchSize: number;
  regularization: number;
  dropoutRate: number;
  
  // Training State
  isTraining: boolean;
  epoch: number;
  trainLoss: number[];
  testLoss: number[];
  trainAccuracy: number[];
  testAccuracy: number[];
  
  // Data
  trainData: { x: number[]; y: number; label: number }[];
  testData: { x: number[]; y: number; label: number }[];
  
  // TF Model
  model: tf.LayersModel | null;
  weights: any[]; // To store weights for visualization
  activations: number[][]; // To store neuron activations for heatmaps
  
  // Actions
  setDatasetType: (type: DatasetType) => void;
  setNoise: (noise: number) => void;
  setTrainTestSplit: (split: number) => void;
  setSampleCount: (count: number) => void;
  setHiddenLayers: (layers: number[]) => void;
  setActivation: (activation: ActivationType) => void;
  setLearningRate: (rate: number) => void;
  setBatchSize: (size: number) => void;
  setRegularization: (reg: number) => void;
  setDropoutRate: (rate: number) => void;
  
  setIsTraining: (isTraining: boolean) => void;
  setEpoch: (epoch: number) => void;
  addMetrics: (trainL: number, testL: number, trainA: number, testA: number) => void;
  resetMetrics: () => void;
  
  setDataset: (train: any[], test: any[]) => void;
  setModel: (model: tf.LayersModel | null) => void;
  updateWeights: () => void;
  setActivations: (activations: number[][]) => void;
  
  // URL Sharing
  serializeState: () => string;
  loadFromUrl: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  datasetType: 'circle',
  noise: 0.1,
  trainTestSplit: 0.7,
  sampleCount: 500,
  
  hiddenLayers: [4, 2],
  activation: 'tanh',
  learningRate: 0.03,
  batchSize: 10,
  regularization: 0,
  dropoutRate: 0,
  
  isTraining: false,
  epoch: 0,
  trainLoss: [],
  testLoss: [],
  trainAccuracy: [],
  testAccuracy: [],
  
  trainData: [],
  testData: [],
  
  model: null,
  weights: [],
  activations: [],
  
  setDatasetType: (datasetType) => set({ datasetType }),
  setNoise: (noise) => set({ noise }),
  setTrainTestSplit: (trainTestSplit) => set({ trainTestSplit }),
  setSampleCount: (sampleCount) => set({ sampleCount }),
  setHiddenLayers: (hiddenLayers) => set({ hiddenLayers }),
  setActivation: (activation) => set({ activation }),
  setLearningRate: (learningRate) => set({ learningRate }),
  setBatchSize: (batchSize) => set({ batchSize }),
  setRegularization: (regularization) => set({ regularization }),
  setDropoutRate: (dropoutRate) => set({ dropoutRate }),
  
  setIsTraining: (isTraining) => set({ isTraining }),
  setEpoch: (epoch) => set({ epoch }),
  addMetrics: (trainL, testL, trainA, testA) => set((state) => ({
    trainLoss: [...state.trainLoss, trainL],
    testLoss: [...state.testLoss, testL],
    trainAccuracy: [...state.trainAccuracy, trainA],
    testAccuracy: [...state.testAccuracy, testA],
  })),
  resetMetrics: () => set({ 
    epoch: 0, 
    trainLoss: [], 
    testLoss: [], 
    trainAccuracy: [], 
    testAccuracy: [] 
  }),
  
  setDataset: (trainData, testData) => set({ trainData, testData }),
  setModel: (model) => set({ model }),
  updateWeights: () => {
    const { model } = get();
    if (!model) return;
    const weights = model.layers.map(l => l.getWeights().map(w => w.arraySync()));
    set({ weights });
  },
  setActivations: (activations) => set({ activations }),

  serializeState: () => {
    const state = get();
    const params = {
      dt: state.datasetType,
      n: state.noise,
      ts: state.trainTestSplit,
      sc: state.sampleCount,
      hl: state.hiddenLayers.join(','),
      a: state.activation,
      lr: state.learningRate,
      bs: state.batchSize,
      r: state.regularization,
      dr: state.dropoutRate
    };
    return btoa(JSON.stringify(params));
  },

  loadFromUrl: () => {
    try {
      const hash = window.location.hash.substring(1);
      if (!hash) return;
      const params = JSON.parse(atob(hash));
      
      set({
        datasetType: params.dt || 'circle',
        noise: params.n ?? 0.1,
        trainTestSplit: params.ts ?? 0.7,
        sampleCount: params.sc ?? 500,
        hiddenLayers: params.hl ? params.hl.split(',').map(Number) : [4, 2],
        activation: params.a || 'tanh',
        learningRate: params.lr ?? 0.03,
        batchSize: params.bs ?? 10,
        regularization: params.r ?? 0,
        dropoutRate: params.dr ?? 0
      });
    } catch (e) {
      console.error('Failed to parse state from URL', e);
    }
  }
}));
