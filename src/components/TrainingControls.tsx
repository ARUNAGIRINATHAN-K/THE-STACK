import React, { useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useAppStore } from '../store/useAppStore';
import { Play, Pause, RotateCcw, SkipForward, Shuffle } from 'lucide-react';
import { predictAllLayers } from '../utils/gridPrediction';

export const TrainingControls: React.FC = () => {
  const {
    isTraining, setIsTraining,
    model, epoch, setEpoch,
    trainData, testData,
    addMetrics, updateWeights,
    batchSize, resetMetrics,
    setActivations
  } = useAppStore();

  const trainingRef = useRef<boolean>(false);

  useEffect(() => {
    trainingRef.current = isTraining;
    if (isTraining) {
      train();
    }
  }, [isTraining]);

  const updateAllVisuals = async () => {
    if (!model) return;
    updateWeights();
    const { activations } = await predictAllLayers(model);
    setActivations(activations);
  };

  const train = async () => {
    if (!model || trainData.length === 0) return;

    const trainX = tf.tensor2d(trainData.map(d => d.x));
    const trainY = tf.tensor2d(trainData.map(d => [d.y]));
    const testX = tf.tensor2d(testData.map(d => d.x));
    const testY = tf.tensor2d(testData.map(d => [d.y]));

    while (trainingRef.current) {
      const history = await model.fit(trainX, trainY, {
        epochs: 1,
        batchSize: batchSize,
        validationData: [testX, testY],
        verbose: 0
      });

      const tLoss = history.history.loss?.[0] as number ?? 0;
      const vLoss = history.history.val_loss?.[0] as number ?? 0;
      const tAcc = history.history.accuracy?.[0] as number ?? 0;
      const vAcc = history.history.val_accuracy?.[0] as number ?? 0;

      addMetrics(tLoss, vLoss, tAcc, vAcc);
      setEpoch(useAppStore.getState().epoch + 1);
      
      // Update visuals every few epochs or every epoch if performance allows
      await updateAllVisuals();

      // Small delay to allow UI updates
      await tf.nextFrame();
    }

    trainX.dispose();
    trainY.dispose();
    testX.dispose();
    testY.dispose();
  };

  const step = async () => {
    if (!model || trainData.length === 0) return;
    
    const trainX = tf.tensor2d(trainData.map(d => d.x));
    const trainY = tf.tensor2d(trainData.map(d => [d.y]));
    const testX = tf.tensor2d(testData.map(d => d.x));
    const testY = tf.tensor2d(testData.map(d => [d.y]));

    const history = await model.fit(trainX, trainY, {
      epochs: 1,
      batchSize: batchSize,
      validationData: [testX, testY],
      verbose: 0
    });

    addMetrics(
      (history.history.loss?.[0] as number) ?? 0,
      (history.history.val_loss?.[0] as number) ?? 0,
      (history.history.accuracy?.[0] as number) ?? 0,
      (history.history.val_accuracy?.[0] as number) ?? 0
    );
    setEpoch(epoch + 1);
    await updateAllVisuals();

    trainX.dispose();
    trainY.dispose();
    testX.dispose();
    testY.dispose();
  };

  const reset = () => {
    setIsTraining(false);
    resetMetrics();
    // Model will be rebuilt by App.tsx effect
  };

  return (
    <div className="flex items-center justify-center gap-4 p-4 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 shadow-lg">
      <button
        onClick={reset}
        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400"
        title="Reset"
      >
        <RotateCcw size={20} />
      </button>

      <button
        onClick={() => setIsTraining(!isTraining)}
        className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold transition-all shadow-md ${
          isTraining 
          ? 'bg-amber-500 hover:bg-amber-600 text-white' 
          : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isTraining ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        {isTraining ? 'Pause' : 'Train'}
      </button>

      <button
        onClick={step}
        disabled={isTraining}
        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400 disabled:opacity-50"
        title="Step (1 Epoch)"
      >
        <SkipForward size={20} />
      </button>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-2" />

      <button
        onClick={reset}
        className="flex items-center gap-2 px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-400 text-sm"
      >
        <Shuffle size={16} />
        Randomize
      </button>
    </div>
  );
};
