import { yardsBetween } from 'lib/coords';
import {
  boundDegrees,
  degreesToRadians,
  isFirstLeftOfSecondDegrees,
  radiansToDegrees,
} from 'lib/math';
import { makeRand, makeRand4 } from 'lib/rand';
import { Terrain } from 'lib/terrain';
import { hitShot, hitShotTowards, putt } from '.';

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
        name: 'test shot',
        potentialOutcomes: [],
      };

      hitShot(badShot, sourceOrigin, Terrain.Fairway, 0, makeRand4());
    }).toThrow();
  });
});

describe('a perfect 100y straight shot', () => {
  const carryYards = 100;
  const shot: Shot = {
    name: 'perfect 100y',
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
      const result = hitShot(
        shot,
        sourceOrigin,
        Terrain.Fairway,
        shotDirectionDegrees,
        makeRand4()
      );

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

  test.each`
    shotTargetXYards            | shotTargetYYards             | expectedXYards                                     | expectedYYards
    ${sourceOrigin.xYards + 1}  | ${sourceOrigin.yYards}       | ${sourceOrigin.xYards + carryYards}                | ${sourceOrigin.yYards}
    ${sourceOrigin.xYards}      | ${sourceOrigin.yYards + 800} | ${sourceOrigin.xYards}                             | ${sourceOrigin.yYards + carryYards}
    ${sourceOrigin.xYards - 13} | ${sourceOrigin.yYards}       | ${sourceOrigin.xYards - carryYards}                | ${sourceOrigin.yYards}
    ${sourceOrigin.xYards}      | ${0}                         | ${sourceOrigin.xYards}                             | ${sourceOrigin.yYards - carryYards}
    ${sourceOrigin.xYards + 17} | ${sourceOrigin.yYards + 17}  | ${sourceOrigin.xYards + carryYards / Math.sqrt(2)} | ${sourceOrigin.yYards + carryYards / Math.sqrt(2)}
  `(
    'hitting toward ($shotTargetXYards, $shotTargetYYards) goes to ($expectedXYards, $expectedYYards)',
    ({
      shotTargetXYards,
      shotTargetYYards,
      expectedXYards,
      expectedYYards,
    }) => {
      const target: Coords = {
        xYards: shotTargetXYards,
        yYards: shotTargetYYards,
      };
      const result = hitShotTowards(
        shot,
        sourceOrigin,
        Terrain.Fairway,
        target,
        makeRand4()
      );

      expect(result.source).toEqual(sourceOrigin);

      const totalDistance = yardsBetween(result.landingSpot, result.source);
      expect(totalDistance).toBeCloseTo(carryYards);
      expect(result.landingSpot.xYards).toBeCloseTo(expectedXYards);
      expect(result.landingSpot.yYards).toBeCloseTo(expectedYYards);
    }
  );
});

describe('a 100y shot that can be pushed or pulled 5 degrees', () => {
  const carryYards = 100;
  const degreeVariance = 5;
  const shot: Shot = {
    name: '100y pushpull',
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
    'going $shotDirectionDegrees° tends vary between a few yards of distance',
    ({ shotDirectionDegrees }) => {
      for (let i = 0; i < 100; i++) {
        const result = hitShot(
          shot,
          sourceOrigin,
          Terrain.Fairway,
          shotDirectionDegrees,
          makeRand4()
        );

        expect(result.source).toEqual(sourceOrigin);

        const totalDistance = yardsBetween(result.landingSpot, result.source);

        const expectedMin = 95;
        const expectedMax = 105;

        // Sanity check total distance
        expect(totalDistance).toBeGreaterThan(expectedMin);
        expect(totalDistance).toBeLessThan(expectedMax);
      }
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
      const result = hitShot(
        shot,
        sourceOrigin,
        Terrain.Fairway,
        0,
        makeRand4()
      );
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
    name: '100y spinner',
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
        const result = hitShot(
          shot,
          sourceOrigin,
          Terrain.Fairway,
          shotDirectionDegrees,
          makeRand4()
        );

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
      const result = hitShot(
        shot,
        sourceOrigin,
        Terrain.Fairway,
        0,
        makeRand4()
      );
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
    name: '100y draw',
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
      const result = hitShot(
        shot,
        sourceOrigin,
        Terrain.Fairway,
        0,
        makeRand4()
      );

      expect(result.landingSpot.yYards).toBeLessThanOrEqual(
        sourceOrigin.yYards
      );

      totalDistanceOffsetY += result.source.yYards - result.landingSpot.yYards;
    }

    const avgOffsetY = totalDistanceOffsetY / iterations;

    expect(avgOffsetY).toBeGreaterThan(1);
  });
});

describe('putt', () => {
  test('all putts under 2 feet always go in', () => {
    for (let i = 0; i < 1000; i++) {
      const numPutts = putt(1.9, 15, makeRand());

      expect(numPutts).toEqual(1);
    }
  });
});
