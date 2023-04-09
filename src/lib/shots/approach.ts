// Using these charts for rough distances to do some quick auto calculation of
// short game and approach shots.  These aren't based on any real data
// that I can tell, but close enough for now.  Improve later.
// https://www.todays-golfer.com/features/instruction-features/january/may/what-is-your-short-game-handicap-/

import { directionDegrees, landNear, yardsBetween } from 'lib/coords';
import { getTerrainUncertaintyMultiplier, Terrain } from 'lib/terrain';

// (in 5 handicap increments starting from scratch)
const remainingFeetFrom5Yards = [3, 4, 5, 7, 9];
const remainingFeetFrom10to20Yards = [8.5, 10.5, 12, 15, 18];
const remainingFeetFrom50to75Yards = [12.5, 15, 20, 25, 33];

// This is VERY rough...
// TODO: Better data / math
export function approachShot(
  from: Coords,
  to: Coords,
  terrain: Terrain,
  handicap: number
): ShotResult {
  const distanceYards = yardsBetween(from, to);

  const handicapBucket = Math.max(
    0,
    Math.min(Math.floor(handicap / 5), remainingFeetFrom5Yards.length)
  );

  let remainingFeet: number = 0;

  if (distanceYards <= 5) {
    remainingFeet = remainingFeetFrom5Yards[handicapBucket];
  } else if (distanceYards <= 25) {
    remainingFeet = remainingFeetFrom10to20Yards[handicapBucket];
  } else if (distanceYards <= 50) {
    remainingFeet = remainingFeetFrom50to75Yards[handicapBucket] * 0.85;
  } else {
    remainingFeet = remainingFeetFrom50to75Yards[handicapBucket];
  }

  const terrainModifier = getTerrainUncertaintyMultiplier(terrain);

  const landingSpot = landNear(to, (remainingFeet / 3) * terrainModifier);

  const startAndEndDegrees = directionDegrees(from, landingSpot);

  return {
    source: from,
    landingSpot: landingSpot,
    startDegrees: startAndEndDegrees,
    endDegrees: startAndEndDegrees,
  };
}
