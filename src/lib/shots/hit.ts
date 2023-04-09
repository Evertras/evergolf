import { directionDegrees } from 'lib/coords';
import { boundDegrees, degreesToRadians } from 'lib/math';
import { getTerrainUncertaintyMultiplier, Terrain } from 'lib/terrain';

export function hitShotTowards(
  shot: Shot,
  source: Coords,
  terrain: Terrain,
  target: Coords
): ShotResult {
  return hitShot(shot, source, terrain, directionDegrees(source, target));
}

// 0 degrees is straight east, increasing clockwise
export function hitShot(
  shot: Shot,
  source: Coords,
  terrain: Terrain,
  initialDirectionDegrees: number
): ShotResult {
  if (shot.potentialOutcomes.length === 0) {
    throw new Error('shot has no outcomes');
  }

  const terrainMultiplier = getTerrainUncertaintyMultiplier(terrain);

  const outcome =
    shot.potentialOutcomes[
      Math.floor(Math.random() * shot.potentialOutcomes.length)
    ];

  const startSpreadDegrees =
    (outcome.startDegreesRightmost - outcome.startDegreesLeftmost) *
    terrainMultiplier;
  const startDegrees = boundDegrees(
    Math.random() * startSpreadDegrees +
      outcome.startDegreesLeftmost +
      initialDirectionDegrees
  );

  const sidespinSpreadDegrees =
    (outcome.sidespinDegreeRightmost - outcome.sidespinDegreeLeftmost) *
    terrainMultiplier;
  const endDegrees = boundDegrees(
    Math.random() * sidespinSpreadDegrees +
      outcome.sidespinDegreeLeftmost +
      startDegrees
  );

  // For now, we cheat a little in figuring out an exact path in favor of getting
  // something that's close enough and easy to draw later.
  const endRadians = degreesToRadians(endDegrees);
  const distanceModifier = Math.cos(
    degreesToRadians(startDegrees - endDegrees) * 2
  );
  const totalDistanceSpread =
    (outcome.carryYardsMax - outcome.carryYardsMin) * terrainMultiplier;
  const totalDistanceYards =
    (Math.random() * totalDistanceSpread + outcome.carryYardsMin) *
    distanceModifier;

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
