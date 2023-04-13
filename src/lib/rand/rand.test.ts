import rand from '.';

// We have to do a fair number of iterations to account for randomness being random
const numIterations = 100;

describe('rand', () => {
  test('gives different values on creation', () => {
    const seen: number[] = [];

    for (let i = 0; i < numIterations; i++) {
      const r = new rand();

      expect(seen).not.toContain(r.value);

      seen.push(r.value);
    }

    // sanity check
    expect(seen).toHaveLength(numIterations);
  });

  test('gives numbers in the requested range', () => {
    const min = 3.383;
    const max = 48.7;

    for (let i = 0; i < 100; i++) {
      const r = new rand();

      const within = r.inRange(min, max);

      expect(within).toBeGreaterThanOrEqual(min);
      expect(within).toBeLessThanOrEqual(max);
    }
  });

  test('explodes if given bad min/max values', () => {
    const min = 10;
    const max = 3;

    const r = new rand();

    expect(() => r.inRange(min, max)).toThrowError();
  });
});
