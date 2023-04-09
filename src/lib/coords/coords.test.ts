import { feetBetween, landNear, yardsBetween } from '.';

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
        const landedAt = landNear(target, avgDistanceYards);
        const distanceYards = yardsBetween(target, landedAt);
        movingAverage = (movingAverage * (i - 1) + distanceYards) / i;
      }

      const diff = Math.abs(movingAverage - avgDistanceYards);

      expect(diff).toBeLessThan(0.5);
    }
  );
});
