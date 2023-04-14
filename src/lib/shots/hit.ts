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
  offDegrees: number,
  baseCarryYards: number
): ShotResult {
  const endRadians = degreesToRadians(endDegrees);

  // For now, we cheat a little in figuring out an exact path in favor of getting
  // something that's close enough and easy to draw later.
  const spinMultiplier = Math.cos(
    degreesToRadians(startDegrees - endDegrees) * 2
  );

  // Account for the face being more open or closed... this isn't a great formula
  // because technically you can fade or draw depending on a number of factors
  // that may not be the face opening or closing, but for now... close enough!
  // This is how we can approximate missing short right for a RH player.
  const openMultiplier = Math.min(1.15, 1 - 0.005 * offDegrees);

  const totalDistanceYards = baseCarryYards * spinMultiplier * openMultiplier;

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
  const offStartDegrees = rands[1].value * startSpreadDegrees;
  const startDegrees = boundDegrees(
    offStartDegrees + outcome.startDegreesLeftmost + initialDirectionDegrees
  );

  const sidespinSpreadDegrees =
    (outcome.sidespinDegreeRightmost - outcome.sidespinDegreeLeftmost) *
    terrainMultiplier;
  const offSideDegrees = rands[2].value * sidespinSpreadDegrees;
  const endDegrees = boundDegrees(
    offSideDegrees + outcome.sidespinDegreeLeftmost + startDegrees
  );

  const totalDistanceSpread =
    (outcome.carryYardsMax - outcome.carryYardsMin) * terrainMultiplier;
  const carryYards =
    rands[3].value * totalDistanceSpread + outcome.carryYardsMin;

  return hitShotWithParameters(
    source,
    startDegrees,
    endDegrees,
    offSideDegrees + offStartDegrees,
    carryYards
  );
}
