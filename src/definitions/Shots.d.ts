interface Shot {
  name: string;
  potentialOutcomes: ShotPotentialOutcome[];
}

interface ShotPotentialOutcome {
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

interface ShotResult {
  source: Coords;
  landingSpot: Coords;
  startDegrees: number;
  endDegrees: number;
}
