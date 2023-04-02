import { yardsBetween } from 'lib/coords';
import { boundDegrees, degreesToRadians, radiansToDegrees } from 'lib/math';
import { Shot, hitShot } from '.';

// Start at a point other than (0, 0) to make sure default 0s aren't being
// used anywhere and x and y are being treated differently
const sourceOrigin: Coords = {
  xYards: 10,
  yYards: 50,
};

describe('a shot with no possible outcomes', () => {
  test('throws when hit', () => {
    expect(() => {
      const badShot: Shot = {
        potentialOutcomes: [],
      };

      hitShot(badShot, sourceOrigin, 0);
    }).toThrow();
  });
});

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

describe('a 100y shot that can be pushed or pulled 5 degrees', () => {
  const carryYards = 100;
  const degreeVariance = 5;
  const shot: Shot = {
    potentialOutcomes: [
      {
        startDegreesLeftmost: -degreeVariance,
        startDegreesRightmost: degreeVariance,
        sidespinDegreeLeftmost: 0,
        sidespinDegreeRightmost: 0,
        carryYardsMin: carryYards,
        carryYardsMax: carryYards,
      },
    ],
  };

  test.each`
    shotDirectionDegrees
    ${0}
    ${90}
    ${180}
    ${270}
    ${359}
    ${723}
    ${-720}
    ${45}
    ${77}
  `(
    'going $shotDirectionDegrees° always goes the expected carry distance',
    ({ shotDirectionDegrees }) => {
      const result = hitShot(shot, sourceOrigin, shotDirectionDegrees);

      expect(result.source).toEqual(sourceOrigin);

      const totalDistance = yardsBetween(result.landingSpot, result.source);
      expect(totalDistance).toBeCloseTo(carryYards);
    }
  );

  test('goes some mixture of all degrees in either direction', () => {
    const maxYardsY =
      carryYards * Math.sin(degreesToRadians(degreeVariance)) +
      sourceOrigin.yYards;
    const minYardsY = -maxYardsY;
    const degreeCounters = [
      0, // -4.999 - -4
      0, // -3.999 - -3
      0, // -2.999 - -2
      0, // -1.999 - -1
      0, // -0.999 - 0
      0, // 0 - 0.999
      0, // 1 - 1.999
      0, // 2 - 2.999
      0, // 3 - 3.999
      0, // 4 - 4.999
    ];

    // Sanity check the test itself
    expect(minYardsY).toBeLessThan(maxYardsY);

    for (let i = 0; i < 1000; i++) {
      const result = hitShot(shot, sourceOrigin, 0);
      expect(result.landingSpot.yYards).toBeGreaterThanOrEqual(minYardsY);
      expect(result.landingSpot.yYards).toBeLessThanOrEqual(maxYardsY);

      const angleDegrees = radiansToDegrees(
        Math.asin(
          (sourceOrigin.yYards - result.landingSpot.yYards) / carryYards
        )
      );

      expect(Math.abs(angleDegrees)).toBeLessThanOrEqual(degreeVariance);
      expect(result.endDegrees).toBeCloseTo(result.startDegrees);

      degreeCounters[Math.floor(angleDegrees + degreeVariance)]++;
    }

    // We don't care how many went each direction for now, we just care that
    // SOME went in each general bucket
    for (let counter of degreeCounters) {
      expect(counter).not.toEqual(0);
    }
  });
});

describe('a 100y shot that can be spun 5° in either direction', () => {
  const carryYards = 100;
  const degreeVariance = 5;
  const shot: Shot = {
    potentialOutcomes: [
      {
        startDegreesLeftmost: 0,
        startDegreesRightmost: 0,
        sidespinDegreeLeftmost: -degreeVariance,
        sidespinDegreeRightmost: degreeVariance,
        carryYardsMin: carryYards,
        carryYardsMax: carryYards,
      },
    ],
  };

  test.each`
    shotDirectionDegrees
    ${0}
    ${90}
    ${180}
    ${270}
    ${359}
    ${723}
    ${-720}
    ${45}
    ${77}
  `(
    'going $shotDirectionDegrees° always takes off a bit of distance from curving',
    ({ shotDirectionDegrees }) => {
      const iterations = 100;
      let totalDistance = 0;

      for (let i = 0; i < iterations; i++) {
        const result = hitShot(shot, sourceOrigin, shotDirectionDegrees);

        expect(result.source).toEqual(sourceOrigin);
        expect(result.startDegrees).toBeCloseTo(
          boundDegrees(shotDirectionDegrees)
        );

        totalDistance += yardsBetween(result.landingSpot, result.source);
      }

      const avgDistance = totalDistance / iterations;

      // Theoretically brittle due to randomness but for now with 100 iterations...
      expect(avgDistance).toBeLessThan(carryYards * 0.999);
      expect(avgDistance).toBeGreaterThan(carryYards * 0.95);
    }
  );

  test('goes some mixture of all degrees in either direction', () => {
    const maxYardsY =
      carryYards * Math.sin(degreesToRadians(degreeVariance)) +
      sourceOrigin.yYards;
    const minYardsY = -maxYardsY;
    const degreeCounters = [
      0, // -4.999 - -4
      0, // -3.999 - -3
      0, // -2.999 - -2
      0, // -1.999 - -1
      0, // -0.999 - 0
      0, // 0 - 0.999
      0, // 1 - 1.999
      0, // 2 - 2.999
      0, // 3 - 3.999
      0, // 4 - 4.999
    ];

    // Sanity check the test itself
    expect(minYardsY).toBeLessThan(maxYardsY);

    for (let i = 0; i < 1000; i++) {
      const result = hitShot(shot, sourceOrigin, 0);
      expect(result.landingSpot.yYards).toBeGreaterThanOrEqual(minYardsY);
      expect(result.landingSpot.yYards).toBeLessThanOrEqual(maxYardsY);

      const angleDegrees = radiansToDegrees(
        Math.asin(
          (sourceOrigin.yYards - result.landingSpot.yYards) / carryYards
        )
      );

      expect(Math.abs(angleDegrees)).toBeLessThanOrEqual(degreeVariance);

      degreeCounters[Math.floor(angleDegrees + degreeVariance)]++;
    }

    // We don't care how many went each direction for now, we just care that
    // SOME went in each general bucket
    for (let counter of degreeCounters) {
      expect(counter).not.toEqual(0);
    }
  });
});

describe('a 100y shot that can only draw left 5°', () => {
  const carryYards = 100;
  const degreeVariance = 5;
  const shot: Shot = {
    potentialOutcomes: [
      {
        startDegreesLeftmost: 0,
        startDegreesRightmost: 0,
        sidespinDegreeLeftmost: -degreeVariance,
        sidespinDegreeRightmost: 0,
        carryYardsMin: carryYards,
        carryYardsMax: carryYards,
      },
    ],
  };

  test('only goes left', () => {
    const iterations = 100;
    let totalDistanceOffsetY = 0;

    for (let i = 0; i < iterations; i++) {
      const result = hitShot(shot, sourceOrigin, 0);

      expect(result.landingSpot.yYards).toBeLessThanOrEqual(
        sourceOrigin.yYards
      );

      totalDistanceOffsetY += result.source.yYards - result.landingSpot.yYards;
    }

    const avgOffsetY = totalDistanceOffsetY / iterations;

    expect(avgOffsetY).toBeGreaterThan(1);
  });
});
