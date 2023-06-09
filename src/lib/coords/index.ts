import { boundDegrees, radiansToDegrees } from 'lib/math';
import { Rand2 } from 'lib/rand';

export function yardsBetween(a: Coords, b: Coords): number {
  const xDiff = a.xYards - b.xYards;
  const yDiff = a.yYards - b.yYards;

  return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}

export function feetBetween(a: Coords, b: Coords): number {
  return yardsBetween(a, b) * 3;
}

export function landNear(
  spot: Coords,
  avgDistanceYards: number,
  rands: Rand2
): Coords {
  const randRadian = rands[0].value * Math.PI * 2;
  const actualDistance = rands[1].value * avgDistanceYards * 2;

  return {
    xYards: Math.cos(randRadian) * actualDistance + spot.xYards,
    yYards: Math.sin(randRadian) * actualDistance + spot.yYards,
  };
}

export function directionDegrees(source: Coords, target: Coords): number {
  return boundDegrees(radiansToDegrees(directionRadians(source, target)));
}

export function scaledByPixels(
  point: Coords,
  pixelsPerYard: number
): CoordsPixels {
  return {
    xPixels: point.xYards * pixelsPerYard,
    yPixels: point.yYards * pixelsPerYard,
  };
}

function directionRadians(source: Coords, target: Coords): number {
  const xDiff = target.xYards - source.xYards;
  const yDiff = target.yYards - source.yYards;

  return Math.atan2(yDiff, xDiff);
}
