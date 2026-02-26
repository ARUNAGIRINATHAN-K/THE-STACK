export function generateCircleData(numSamples: number, noise: number) {
  const points = [];
  const radius = 5;
  for (let i = 0; i < numSamples; i++) {
    const r = i < numSamples / 2 ? Math.random() * radius * 0.5 : Math.random() * radius * 0.5 + radius * 0.7;
    const angle = Math.random() * Math.PI * 2;
    const x = r * Math.cos(angle) + (Math.random() - 0.5) * noise * 10;
    const y = r * Math.sin(angle) + (Math.random() - 0.5) * noise * 10;
    const label = i < numSamples / 2 ? 1 : 0;
    points.push({ x: [x, y], y: label, label });
  }
  return points;
}

export function generateXORData(numSamples: number, noise: number) {
  const points = [];
  const padding = 0.3;
  for (let i = 0; i < numSamples; i++) {
    let x = (Math.random() - 0.5) * 10;
    let y = (Math.random() - 0.5) * 10;
    x += x > 0 ? padding : -padding;
    y += y > 0 ? padding : -padding;
    
    const label = (x > 0 && y > 0) || (x < 0 && y < 0) ? 1 : 0;
    x += (Math.random() - 0.5) * noise * 10;
    y += (Math.random() - 0.5) * noise * 10;
    points.push({ x: [x, y], y: label, label });
  }
  return points;
}

export function generateGaussianData(numSamples: number, noise: number) {
  const points = [];
  for (let i = 0; i < numSamples; i++) {
    const label = i < numSamples / 2 ? 1 : 0;
    const centerX = label === 1 ? 2 : -2;
    const centerY = label === 1 ? 2 : -2;
    const x = centerX + (Math.random() - 0.5) * 4 + (Math.random() - 0.5) * noise * 10;
    const y = centerY + (Math.random() - 0.5) * 4 + (Math.random() - 0.5) * noise * 10;
    points.push({ x: [x, y], y: label, label });
  }
  return points;
}

export function generateSpiralData(numSamples: number, noise: number) {
  const points = [];
  const n = numSamples / 2;
  for (let i = 0; i < n; i++) {
    const r = (i / n) * 5;
    const t = (1.75 * i / n) * 2 * Math.PI;
    const x1 = r * Math.sin(t) + (Math.random() - 0.5) * noise;
    const y1 = r * Math.cos(t) + (Math.random() - 0.5) * noise;
    points.push({ x: [x1, y1], y: 1, label: 1 });

    const x2 = -r * Math.sin(t) + (Math.random() - 0.5) * noise;
    const y2 = -r * Math.cos(t) + (Math.random() - 0.5) * noise;
    points.push({ x: [x2, y2], y: 0, label: 0 });
  }
  return points;
}

export function generateCheckerboardData(numSamples: number, noise: number) {
  const points = [];
  for (let i = 0; i < numSamples; i++) {
    let x = (Math.random() - 0.5) * 10;
    let y = (Math.random() - 0.5) * 10;
    const label = (Math.floor(x + 5) % 2 === Math.floor(y + 5) % 2) ? 1 : 0;
    x += (Math.random() - 0.5) * noise * 5;
    y += (Math.random() - 0.5) * noise * 5;
    points.push({ x: [x, y], y: label, label });
  }
  return points;
}

export function generateMoonsData(numSamples: number, noise: number) {
  const points = [];
  const n = numSamples / 2;
  for (let i = 0; i < n; i++) {
    const t = (i / n) * Math.PI;
    const x1 = Math.cos(t) * 4 + (Math.random() - 0.5) * noise * 2;
    const y1 = Math.sin(t) * 4 + (Math.random() - 0.5) * noise * 2;
    points.push({ x: [x1, y1], y: 1, label: 1 });

    const x2 = 1 - Math.cos(t) * 4 + (Math.random() - 0.5) * noise * 2;
    const y2 = 0.5 - Math.sin(t) * 4 + (Math.random() - 0.5) * noise * 2;
    points.push({ x: [x2, y2], y: 0, label: 0 });
  }
  return points;
}

export function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
