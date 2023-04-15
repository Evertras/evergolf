import { makeRand2, Rand } from 'lib/rand';
import {
  directionDegrees,
  feetBetween,
  landNear,
  scaledByPixels,
  yardsBetween,
} from '.';

describe('yardsBetween', () => {
  test.each`
    points           | expectedDistance
    ${[0, 0, 0, 0]}  | ${0}
    ${[0, 0, 1, 0]}  | ${1}
    ${[1, 0, 1, 0]}  | ${0}
    ${[1, 1, 1, 5]}  | ${4}
    ${[-1, 1, 1, 5]} | ${4.472}
  `(
    '$points are $expectedDistance yards apart',
    ({ points, expectedDistance }) => {
      const from = {
        xYards: points[0],
        yYards: points[1],
      };

      const to = {
        xYards: points[2],
        yYards: points[3],
      };

      const distance = yardsBetween(from, to);
      expect(distance).toBeCloseTo(expectedDistance);
    }
  );
});

describe('feetBetween', () => {
  test.each`
    points           | expectedDistance
    ${[0, 0, 0, 0]}  | ${0}
    ${[0, 0, 1, 0]}  | ${3}
    ${[1, 0, 1, 0]}  | ${0}
    ${[1, 1, 1, 5]}  | ${12}
    ${[-1, 1, 1, 5]} | ${13.416408}
  `(
    '$points are $expectedDistance feet apart',
    ({ points, expectedDistance }) => {
      const from = {
        xYards: points[0],
        yYards: points[1],
      };

      const to = {
        xYards: points[2],
        yYards: points[3],
      };

      const distance = feetBetween(from, to);
      expect(distance).toBeCloseTo(expectedDistance);
    }
  );
});

describe('landNear', () => {
  test.each`
    avgDistanceYards
    ${3}
    ${6}
    ${10}
    ${100}
  `(
    'lands near an average of $avgDistanceYards away after many iterations',
    ({ avgDistanceYards }) => {
      let movingAverage = 0;

      const target: Coords = {
        xYards: 138,
        yYards: 7,
      };

      for (let i = 1; i <= 100000; i++) {
        const rands = makeRand2();
        const landedAt = landNear(target, avgDistanceYards, rands);
        const distanceYards = yardsBetween(target, landedAt);
        movingAverage = (movingAverage * (i - 1) + distanceYards) / i;
      }

      const diff = Math.abs(movingAverage - avgDistanceYards);

      expect(diff).toBeLessThan(0.5);
    }
  );

  test('uses different values from rands', () => {
    const constantRand = new Rand();
    const target = {
      xYards: 0,
      yYards: 0,
    };

    const seen: Coords[] = [];

    for (let i = 0; i < 100; i++) {
      const landedAt = landNear(target, 10, [constantRand, new Rand()]);

      expect(seen).not.toContain<Coords>(landedAt);
    }
  });
});

describe('directionDegrees', () => {
  test.each`
    ax     | ay   | bx     | by   | expectedDegrees
    ${0}   | ${0} | ${1}   | ${0} | ${0}
    ${101} | ${0} | ${307} | ${0} | ${0}
    ${1}   | ${1} | ${0}   | ${0} | ${225}
    ${1}   | ${1} | ${5}   | ${5} | ${45}
  `(
    '($ax, $ay) to ($bx, $by) points at $expectedDegrees',
    ({ ax, ay, bx, by, expectedDegrees }) => {
      const a: Coords = {
        xYards: ax,
        yYards: ay,
      };

      const b: Coords = {
        xYards: bx,
        yYards: by,
      };

      const degrees = directionDegrees(a, b);

      expect(degrees).toBeCloseTo(expectedDegrees);
    }
  );
});

describe('scaledByPixels', () => {
  const point: Coords = {
    xYards: 3,
    yYards: 7,
  };

  const pixelsPerYard = 4;

  const pixelPoint = scaledByPixels(point, pixelsPerYard);

  expect(pixelPoint.xPixels).toEqual(12);
  expect(pixelPoint.yPixels).toEqual(28);
});
