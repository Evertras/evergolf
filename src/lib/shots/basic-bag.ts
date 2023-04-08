const startDegreeVariance = 5;
const spinVariance = 15;

// A sample bag to play with, not based on anything but rough playable yardages
// and a bit of variance.  Replace with actual stats later.
export const basicBag: Shot[] = [
  {
    name: '58°',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.5,
        startDegreesRightmost: startDegreeVariance * 0.5,
        sidespinDegreeLeftmost: -spinVariance * 0.5,
        sidespinDegreeRightmost: spinVariance * 0.5,
        carryYardsMin: 75,
        carryYardsMax: 85,
      },
    ],
  },
  {
    name: '54°',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.5,
        startDegreesRightmost: startDegreeVariance * 0.5,
        sidespinDegreeLeftmost: -spinVariance * 0.5,
        sidespinDegreeRightmost: spinVariance * 0.5,
        carryYardsMin: 85,
        carryYardsMax: 95,
      },
    ],
  },
  {
    name: 'GW',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.6,
        startDegreesRightmost: startDegreeVariance * 0.6,
        sidespinDegreeLeftmost: -spinVariance * 0.6,
        sidespinDegreeRightmost: spinVariance * 0.6,
        carryYardsMin: 95,
        carryYardsMax: 120,
      },
    ],
  },
  {
    name: 'PW',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.6,
        startDegreesRightmost: startDegreeVariance * 0.6,
        sidespinDegreeLeftmost: -spinVariance * 0.6,
        sidespinDegreeRightmost: spinVariance * 0.6,
        carryYardsMin: 110,
        carryYardsMax: 135,
      },
    ],
  },
  {
    name: '9i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.7,
        startDegreesRightmost: startDegreeVariance * 0.7,
        sidespinDegreeLeftmost: -spinVariance * 0.7,
        sidespinDegreeRightmost: spinVariance * 0.7,
        carryYardsMin: 125,
        carryYardsMax: 145,
      },
    ],
  },
  {
    name: '8i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.7,
        startDegreesRightmost: startDegreeVariance * 0.7,
        sidespinDegreeLeftmost: -spinVariance * 0.7,
        sidespinDegreeRightmost: spinVariance * 0.7,
        carryYardsMin: 135,
        carryYardsMax: 155,
      },
    ],
  },
  {
    name: '7i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.7,
        startDegreesRightmost: startDegreeVariance * 0.7,
        sidespinDegreeLeftmost: -spinVariance * 0.7,
        sidespinDegreeRightmost: spinVariance * 0.7,
        carryYardsMin: 150,
        carryYardsMax: 165,
      },
    ],
  },
  {
    name: '6i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.8,
        startDegreesRightmost: startDegreeVariance * 0.8,
        sidespinDegreeLeftmost: -spinVariance * 0.8,
        sidespinDegreeRightmost: spinVariance * 0.8,
        carryYardsMin: 155,
        carryYardsMax: 170,
      },
    ],
  },
  {
    name: '5i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.9,
        startDegreesRightmost: startDegreeVariance * 0.9,
        sidespinDegreeLeftmost: -spinVariance * 0.9,
        sidespinDegreeRightmost: spinVariance * 0.9,
        carryYardsMin: 165,
        carryYardsMax: 185,
      },
    ],
  },
  {
    name: '4i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.9,
        startDegreesRightmost: startDegreeVariance * 0.9,
        sidespinDegreeLeftmost: -spinVariance * 0.9,
        sidespinDegreeRightmost: spinVariance * 0.9,
        carryYardsMin: 175,
        carryYardsMax: 190,
      },
    ],
  },
  {
    name: '3i',
    potentialOutcomes: [
      {
        startDegreesLeftmost: -startDegreeVariance * 0.9,
        startDegreesRightmost: startDegreeVariance * 0.9,
        sidespinDegreeLeftmost: -spinVariance * 0.9,
        sidespinDegreeRightmost: spinVariance * 0.9,
        carryYardsMin: 180,
        carryYardsMax: 210,
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
        carryYardsMax: 240,
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
