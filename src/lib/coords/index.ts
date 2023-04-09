import { boundDegrees, radiansToDegrees } from 'lib/math';

export interface Coords {
  xYards: number;
  yYards: number;
}

export function yardsBetween(a: Coords, b: Coords): number {
  const xDiff = a.xYards - b.xYards;
  const yDiff = a.yYards - b.yYards;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export function feetBetween(a: Coords, b: Coords): number {
  return yardsBetween(a, b) * 3;
}

export function landNear(spot: Coords, avgDistanceYards: number): Coords {
  const randRadian = Math.random() * Math.PI * 2;
  const actualDistance = Math.random() * avgDistanceYards * 2;

  return {
    xYards: Math.cos(randRadian) * actualDistance + spot.xYards,
    yYards: Math.sin(randRadian) * actualDistance + spot.yYards,
  };
}

function directionRadians(source: Coords, target: Coords): number {
  const xDiff = target.xYards - source.xYards;
  const yDiff = target.yYards - source.yYards;

  return Math.atan2(yDiff, xDiff);
}

export function directionDegrees(source: Coords, target: Coords): number {
  return boundDegrees(radiansToDegrees(directionRadians(source, target)));
}
