import { Rand, makeRand, makeRand2, makeRand4 } from '.';

// We have to do a fair number of iterations to account for randomness being random
const numIterations = 100;

describe('rand', () => {
  test('gives different values on creation', () => {
    const seen: number[] = [];

    for (let i = 0; i < numIterations; i++) {
      const r = new Rand();

      expect(seen).not.toContain(r.value);

      seen.push(r.value);
    }

    // sanity check
    expect(seen).toHaveLength(numIterations);
  });

  test('gives the same value when asked', () => {
    const r = new Rand();

    const x = r.inRange(3, 17);
    const y = r.inRange(3, 17);

    expect(x).toEqual(y);
  });

  test('gives numbers in the requested range', () => {
    const min = 3.383;
    const max = 48.7;

    for (let i = 0; i < 100; i++) {
      const r = new Rand();

      const within = r.inRange(min, max);

      expect(within).toBeGreaterThanOrEqual(min);
      expect(within).toBeLessThanOrEqual(max);
    }
  });

  test('explodes if given bad min/max values', () => {
    const min = 10;
    const max = 3;

    const r = new Rand();

    expect(() => r.inRange(min, max)).toThrowError();
  });
});

describe('makeRands', () => {
  test('makeRand gives a new value each time', () => {
    const r1 = makeRand();
    const r2 = makeRand();

    expect(r1.value).not.toEqual(r2.value);
  });

  test('makeRand2 gives different values', () => {
    const r = makeRand2();

    expect(r[0].value).not.toEqual(r[1].value);
  });

  test('makeRand4 gives different values', () => {
    const r = makeRand4();

    expect(r[0].value).not.toEqual(r[1].value);
    expect(r[1].value).not.toEqual(r[2].value);
    expect(r[2].value).not.toEqual(r[3].value);
  });
});
