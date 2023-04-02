import { yardsBetween } from 'lib/coords';
import { Shot, hitShot } from '.';

// Start at a point other than (0, 0) to make sure default 0s aren't being
// used anywhere and x and y are being treated differently
const sourceOrigin: Coords = {
  xYards: 10,
  yYards: 50,
};

describe('a perfect 100y straight shot', () => {
  const carryYards = 100;
  const shot: Shot = {
    potentialOutcomes: [
      {
        startDegreesLeftmost: 0,
        startDegreesRightmost: 0,
        sidespinDegreeLeftmost: 0,
        sidespinDegreeRightmost: 0,
        carryYardsMin: carryYards,
        carryYardsMax: carryYards,
      },
    ],
  };

  const boundDegrees = (deg: number): number => {
    return (deg + 720) % 360;
  };

  test.each`
    shotDirectionDegrees | expectedXYards                                     | expectedYYards
    ${0}                 | ${sourceOrigin.xYards + carryYards}                | ${sourceOrigin.yYards}
    ${90}                | ${sourceOrigin.xYards}                             | ${sourceOrigin.yYards + carryYards}
    ${180}               | ${sourceOrigin.xYards - carryYards}                | ${sourceOrigin.yYards}
    ${270}               | ${sourceOrigin.xYards}                             | ${sourceOrigin.yYards - carryYards}
    ${720}               | ${sourceOrigin.xYards + carryYards}                | ${sourceOrigin.yYards}
    ${-720}              | ${sourceOrigin.xYards + carryYards}                | ${sourceOrigin.yYards}
    ${45}                | ${sourceOrigin.xYards + carryYards / Math.sqrt(2)} | ${sourceOrigin.yYards + carryYards / Math.sqrt(2)}
  `(
    '$shotDirectionDegrees° goes to ($expectedXYards, $expectedYYards)',
    ({ shotDirectionDegrees, expectedXYards, expectedYYards }) => {
      const result = hitShot(shot, sourceOrigin, shotDirectionDegrees);

      expect(result.source).toEqual(sourceOrigin);

      const totalDistance = yardsBetween(result.landingSpot, result.source);
      expect(totalDistance).toBeCloseTo(carryYards);

      expect(boundDegrees(result.startDegrees)).toBeCloseTo(
        boundDegrees(shotDirectionDegrees)
      );
      expect(boundDegrees(result.endDegrees)).toBeCloseTo(
        boundDegrees(shotDirectionDegrees)
      );
      expect(result.landingSpot.xYards).toBeCloseTo(expectedXYards);
      expect(result.landingSpot.yYards).toBeCloseTo(expectedYYards);
    }
  );
});
