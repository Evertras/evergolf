// Converts degrees to radians
export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Converts radians to degrees
export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

// Bounds a degree value to be 0° <= degrees < 360°
export function boundDegrees(degrees: number): number {
  return (degrees + 720) % 360;
}

// Returns the average degree value for two angles that are <180° apart
export function avgDegrees(a: number, b: number): number {
  const diff = ((a - b + 540) % 360) - 180;
  const avg = (360 + b + diff / 2) % 360;

  return avg;
}
