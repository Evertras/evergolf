const startDegreeVariance = 5;
const spinVariance = 15;

// A sample bag to play with, not based on anything but rough playable yardages
// and a bit of variance.  Replace with actual stats later.
export const basicBag: Shot[] = [
  {
    name: '58°',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 80,
        carryYardsMax: 85,
      },
    ],
  },
  {
    name: '54°',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 90,
        carryYardsMax: 95,
      },
    ],
  },
  {
    name: 'GW',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 100,
        carryYardsMax: 115,
      },
    ],
  },
  {
    name: 'PW',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 120,
        carryYardsMax: 130,
      },
    ],
  },
  {
    name: '9i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 130,
        carryYardsMax: 140,
      },
    ],
  },
  {
    name: '8i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 140,
        carryYardsMax: 150,
      },
    ],
  },
  {
    name: '7i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 150,
        carryYardsMax: 160,
      },
    ],
  },
  {
    name: '6i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 160,
        carryYardsMax: 170,
      },
    ],
  },
  {
    name: '5i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 170,
        carryYardsMax: 180,
      },
    ],
  },
  {
    name: '4i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 180,
        carryYardsMax: 190,
      },
    ],
  },
  {
    name: '3i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 190,
        carryYardsMax: 200,
      },
    ],
  },
  {
    name: '5W',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 200,
        carryYardsMax: 230,
      },
    ],
  },
  {
    name: 'D',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance,
        startDegreesRightmost: startDegreeVariance,
        sidespinDegreeLeftmost: -spinVariance,
        sidespinDegreeRightmost: spinVariance,
        carryYardsMin: 230,
        carryYardsMax: 250,
      },
    ],
  },
];
