export interface Coords {
  xYards: number;
  yYards: number;
}

export function yardsBetween(a: Coords, b: Coords): number {
  const xDiff = a.xYards - b.xYards;
  const yDiff = a.yYards - b.yYards;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}