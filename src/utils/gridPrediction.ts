import * as tf from '@tensorflow/tfjs';

export async function predictGrid(model: tf.LayersModel, resolution: number = 50) {
  const range = 6;
  const step = (range * 2) / resolution;
  const grid = [];
  
  for (let y = range; y >= -range; y -= step) {
    for (let x = -range; x <= range; x += step) {
      grid.push([x, y]);
    }
  }

  const inputTensor = tf.tensor2d(grid);
  const prediction = model.predict(inputTensor) as tf.Tensor;
  const values = await prediction.data();
  
  inputTensor.dispose();
  prediction.dispose();

  return {
    values: Array.from(values),
    resolution,
    range
  };
}

export async function predictAllLayers(model: tf.LayersModel, resolution: number = 20) {
  const range = 6;
  const step = (range * 2) / resolution;
  const grid = [];
  
  for (let y = range; y >= -range; y -= step) {
    for (let x = -range; x <= range; x += step) {
      grid.push([x, y]);
    }
  }

  const inputTensor = tf.tensor2d(grid);
  
  // Create a model that outputs all layer activations
  const layerOutputs = model.layers.map(l => l.output);
  const activationModel = tf.model({ inputs: model.inputs, outputs: layerOutputs as tf.SymbolicTensor[] });
  
  const predictions = activationModel.predict(inputTensor) as tf.Tensor | tf.Tensor[];
  const results: number[][] = [];
  
  if (Array.isArray(predictions)) {
    for (const p of predictions) {
      results.push(Array.from(await p.data()));
      p.dispose();
    }
  } else {
    results.push(Array.from(await predictions.data()));
    predictions.dispose();
  }
  
  inputTensor.dispose();

  return {
    activations: results,
    resolution,
    range
  };
}
