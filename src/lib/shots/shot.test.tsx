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

  /*
    ${180} | ${{xYards: sourceOrigin.xYards - 100, yYards: sourceOrigin.yYards}}
    ${270} | ${{xYards: sourceOrigin.xYards , yYards: sourceOrigin.yYards - 100}}
    ${720} | ${{xYards: sourceOrigin.xYards + 100, yYards: sourceOrigin.yYards}}
  */

  const boundDegrees = (deg: number): number => {
    return (deg + 720) % 360;
  };

  test.each`
    shotDirectionDegrees | expectedLandingSpot
    ${0}                 | ${{ xYards: sourceOrigin.xYards + carryYards, yYards: sourceOrigin.yYards }}
    ${90}                | ${{ xYards: sourceOrigin.xYards, yYards: sourceOrigin.yYards + carryYards }}
  `(
    '$shotDirectionDegrees degrees goes to $expectedLandingSpot',
    ({ shotDirectionDegrees, expectedLandingSpot }) => {
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
      expect(result.landingSpot.xYards).toBeCloseTo(expectedLandingSpot.xYards);
      expect(result.landingSpot.yYards).toBeCloseTo(expectedLandingSpot.yYards);
    }
  );
});
