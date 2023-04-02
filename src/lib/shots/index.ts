import { avgDegrees, boundDegrees, degreesToRadians } from 'lib/math';

export interface Shot {
  potentialOutcomes: ShotPotentialOutcome[];
}

export interface ShotPotentialOutcome {
  // 0 is straight, 5 is 5 degrees right, -5 is 5 degrees left
  startDegreesLeftmost: number;

  // 0 is straight, 5 is 5 degrees right, -5 is 5 degrees left
  startDegreesRightmost: number;

  // 0 is straight, 5 is 5 degrees right, -5 is 5 degrees left
  sidespinDegreeLeftmost: number;

  // 0 is straight, 5 is 5 degrees right, -5 is 5 degrees left
  sidespinDegreeRightmost: number;

  carryYardsMin: number;
  carryYardsMax: number;
}

export interface ShotResult {
  source: Coords;
  landingSpot: Coords;
  startDegrees: number;
  endDegrees: number;
}

// 0 degrees is straight east, increasing clockwise
export function hitShot(
  shot: Shot,
  source: Coords,
  initialDirectionDegrees: number
): ShotResult {
  if (shot.potentialOutcomes.length == 0) {
    throw 'shot has no outcomes';
  }

  const outcome =
    shot.potentialOutcomes[
      Math.floor(Math.random() * shot.potentialOutcomes.length)
    ];

  const startSpreadDegrees =
    outcome.startDegreesRightmost - outcome.startDegreesLeftmost;
  const startDegrees = boundDegrees(
    Math.random() * startSpreadDegrees +
      outcome.startDegreesLeftmost +
      initialDirectionDegrees
  );

  const sidespinSpreadDegrees =
    outcome.sidespinDegreeRightmost - outcome.sidespinDegreeLeftmost;
  const endDegrees = boundDegrees(
    Math.random() * sidespinSpreadDegrees +
      outcome.sidespinDegreeLeftmost +
      startDegrees
  );

  const totalDistanceSpread = outcome.carryYardsMax - outcome.carryYardsMin;
  const totalDistanceYards =
    Math.random() * totalDistanceSpread + outcome.carryYardsMin;

  // For now, we cheat a little in figuring out an exact path in favor of getting
  // something that's close enough and easy to draw later.
  const avgDirectionDegrees = avgDegrees(startDegrees, endDegrees);
  const avgDirectionRadians = degreesToRadians(avgDirectionDegrees);
  const xDistanceYards = Math.cos(avgDirectionRadians) * totalDistanceYards;
  const yDistanceYards = Math.sin(avgDirectionRadians) * totalDistanceYards;

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
