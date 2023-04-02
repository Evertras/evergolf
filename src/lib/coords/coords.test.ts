import { yardsBetween } from '.';

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
