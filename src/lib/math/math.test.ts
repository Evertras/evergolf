import {
  avgDegrees,
  boundDegrees,
  degreesToRadians,
  radiansToDegrees,
} from '.';

describe('degreesToRadians', () => {
  test.each`
    degrees | radians
    ${0}    | ${0}
    ${90}   | ${Math.PI / 2}
    ${180}  | ${Math.PI}
    ${270}  | ${(Math.PI * 3) / 2}
    ${360}  | ${Math.PI * 2}
    ${-90}  | ${-Math.PI / 2}
  `('$degrees° converts to $radians radians', ({ degrees, radians }) => {
    const actualRadians = degreesToRadians(degrees);

    expect(actualRadians).toBeCloseTo(radians);
  });
});

describe('radiansToDegrees', () => {
  test.each`
    degrees | radians
    ${0}    | ${0}
    ${90}   | ${Math.PI / 2}
    ${180}  | ${Math.PI}
    ${270}  | ${(Math.PI * 3) / 2}
    ${360}  | ${Math.PI * 2}
    ${-90}  | ${-Math.PI / 2}
  `('$radians radians converts to $degrees°', ({ degrees, radians }) => {
    const actualDegrees = radiansToDegrees(radians);

    expect(actualDegrees).toBeCloseTo(degrees);
  });
});

describe('boundDegrees', () => {
  test.each`
    degrees  | bounded
    ${0}     | ${0}
    ${90}    | ${90}
    ${300}   | ${300}
    ${359.9} | ${359.9}
    ${360}   | ${0}
    ${360.1} | ${0.1}
    ${3000}  | ${120}
  `('$degrees° is bound to $bounded°', ({ degrees, bounded }) => {
    const actualBounded = boundDegrees(degrees);
    expect(actualBounded).toBeCloseTo(bounded);
  });
});

describe('avgDegrees (for angles 180° or less close to each other)', () => {
  test.each`
    first  | second | avg
    ${0}   | ${0}   | ${0}
    ${0}   | ${30}  | ${15}
    ${90}  | ${180} | ${135}
    ${359} | ${359} | ${359}
    ${1}   | ${359} | ${0}
    ${4}   | ${359} | ${1.5}
  `('$first° and $second° average to $avg°', ({ first, second, avg }) => {
    const actualAvg = avgDegrees(first, second);

    expect(actualAvg).toBeCloseTo(avg);
  });
});
