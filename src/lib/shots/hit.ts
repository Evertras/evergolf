import { directionDegrees } from 'lib/coords';
import { boundDegrees, degreesToRadians } from 'lib/math';
import { Rand4 } from 'lib/rand';
import { getTerrainUncertaintyMultiplier, Terrain } from 'lib/terrain';

export function hitShotTowards(
  shot: Shot,
  source: Coords,
  terrain: Terrain,
  target: Coords,
  rands: Rand4
): ShotResult {
  return hitShot(
    shot,
    source,
    terrain,
    directionDegrees(source, target),
    rands
  );
}

export function hitShotWithParameters(
  source: Coords,
  startDegrees: number,
  endDegrees: number,
  baseCarryYards: number
): ShotResult {
  // For now, we cheat a little in figuring out an exact path in favor of getting
  // something that's close enough and easy to draw later.
  const endRadians = degreesToRadians(endDegrees);
  const totalDistanceYards =
    baseCarryYards * Math.cos(degreesToRadians(startDegrees - endDegrees) * 2);

  const xDistanceYards = Math.cos(endRadians) * totalDistanceYards;
  const yDistanceYards = Math.sin(endRadians) * totalDistanceYards;

  const landingSpot = {
    xYards: source.xYards + xDistanceYards,
    yYards: source.yYards + yDistanceYards,
  };

  return {
    source,
    landingSpot,
    startDegrees,
    endDegrees,
  };
}

// 0 degrees is straight east, increasing clockwise
export function hitShot(
  shot: Shot,
  source: Coords,
  terrain: Terrain,
  initialDirectionDegrees: number,
  rands: Rand4
): ShotResult {
  if (shot.potentialOutcomes.length === 0) {
    throw new Error('shot has no outcomes');
  }

  const terrainMultiplier = getTerrainUncertaintyMultiplier(terrain);

  const outcome =
    shot.potentialOutcomes[
      Math.floor(rands[0].value * shot.potentialOutcomes.length)
    ];

  const startSpreadDegrees =
    (outcome.startDegreesRightmost - outcome.startDegreesLeftmost) *
    terrainMultiplier;
  const startDegrees = boundDegrees(
    rands[1].value * startSpreadDegrees +
      outcome.startDegreesLeftmost +
      initialDirectionDegrees
  );

  const sidespinSpreadDegrees =
    (outcome.sidespinDegreeRightmost - outcome.sidespinDegreeLeftmost) *
    terrainMultiplier;
  const endDegrees = boundDegrees(
    rands[2].value * sidespinSpreadDegrees +
      outcome.sidespinDegreeLeftmost +
      startDegrees
  );

  const totalDistanceSpread =
    (outcome.carryYardsMax - outcome.carryYardsMin) * terrainMultiplier;
  const carryYards =
    rands[3].value * totalDistanceSpread + outcome.carryYardsMin;

  return hitShotWithParameters(source, startDegrees, endDegrees, carryYards);
}
