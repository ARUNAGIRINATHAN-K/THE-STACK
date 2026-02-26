import * as tf from '@tensorflow/tfjs';
import { ActivationType } from '../store/useAppStore';

export function buildModel(
  hiddenLayers: number[],
  activation: ActivationType,
  learningRate: number,
  regularization: number,
  dropoutRate: number = 0
): tf.LayersModel {
  const model = tf.sequential();

  // Filter out any invalid layers
  const validLayers = hiddenLayers.filter(size => !isNaN(size) && size > 0);
  
  if (validLayers.length === 0) {
    // Fallback if no valid layers
    validLayers.push(4);
  }

  // Input layer
  model.add(tf.layers.dense({
    units: validLayers[0],
    activation: activation as any,
    inputShape: [2],
    kernelRegularizer: regularization > 0 ? tf.regularizers.l2({ l2: regularization }) : undefined
  }));

  if (dropoutRate > 0) {
    model.add(tf.layers.dropout({ rate: dropoutRate }));
  }

  // Hidden layers
  for (let i = 1; i < validLayers.length; i++) {
    model.add(tf.layers.dense({
      units: validLayers[i],
      activation: activation as any,
      kernelRegularizer: regularization > 0 ? tf.regularizers.l2({ l2: regularization }) : undefined
    }));
    
    if (dropoutRate > 0) {
      model.add(tf.layers.dropout({ rate: dropoutRate }));
    }
  }

  // Output layer
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));

  const optimizer = tf.train.sgd(learningRate);
  model.compile({
    optimizer,
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}
