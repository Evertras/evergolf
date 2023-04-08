import { render, screen } from '@testing-library/react';
import { Terrain } from 'lib/terrain';
import Scorecard from '.';

test('Scorecard still shows hole numbers when no shots have been taken', () => {
  const shotHistory: ShotHistory[][] = [];
  const numHoles = 18;
  const course: CourseData = {
    name: 'testCourse',
    holes: [
      ...Array.from({ length: numHoles }).map(
        (_, i: number): HoleData => ({
          holeNumber: i + 1,
          par: 4,
          imgSrcURL: 'imgsrc',
          widthYards: 100,
          heightYards: 100,
          imgPixelsPerYard: 10,
          teeLocations: { white: { xYards: 5, yYards: 5 } },
          pinLocations: [{ xYards: 95, yYards: 95 }],
        })
      ),
    ],
  };

  render(<Scorecard course={course} shotsTaken={shotHistory} activeHole={1} />);

  for (let holeNumber = 1; holeNumber <= numHoles; holeNumber++) {
    // May have overlap with par, just make sure something is there
    const scoreDiv = screen.getAllByText(holeNumber);

    expect(scoreDiv.length).not.toEqual(0);
  }
});

test('Scorecard shows basic score on finished hole', () => {
  const teeLocation: Coords = { xYards: 5, yYards: 5 };
  const pinLocation: Coords = { xYards: 95, yYards: 95 };
  const landingSpot: Coords = { xYards: 90, yYards: 95 };
  const shotHistory: ShotHistory[][] = [
    [
      {
        result: {
          source: teeLocation,
          landingSpot,
          startDegrees: 45,
          endDegrees: 45,
        },
        terrainFrom: Terrain.Fairway,
        terrainTo: Terrain.Green,
        strokes: 1,
      },
      {
        result: {
          source: landingSpot,
          landingSpot: pinLocation,
          startDegrees: 45,
          endDegrees: 45,
        },
        terrainFrom: Terrain.Green,
        terrainTo: Terrain.Hole,
        // 8 putts just to get unique numbers on card to check
        strokes: 8,
      },
    ],
  ];

  const course: CourseData = {
    name: 'testCourse',
    holes: [
      {
        holeNumber: 1,
        par: 3,
        imgSrcURL: 'imgsrc',
        widthYards: 100,
        heightYards: 100,
        imgPixelsPerYard: 10,
        teeLocations: { white: teeLocation },
        pinLocations: [{ xYards: 95, yYards: 95 }],
      },
    ],
  };

  render(<Scorecard course={course} shotsTaken={shotHistory} activeHole={1} />);

  // Also have the total score
  const scoreDivs = screen.getAllByText('9');
  expect(scoreDivs).toHaveLength(2);
  expect(scoreDivs[0]).toBeInTheDocument();

  // Also have the total putts
  const puttsDivs = screen.getAllByText('8');
  expect(scoreDivs).toHaveLength(2);
  expect(puttsDivs[0]).toBeInTheDocument();

  // Also have the total score
  const relativeDivs = screen.getAllByText('+6');
  expect(relativeDivs).toHaveLength(2);
  expect(relativeDivs[0]).toBeInTheDocument();
});

test('Scorecard shows penalized score on finished hole', () => {
  const teeLocation: Coords = { xYards: 5, yYards: 5 };
  const pinLocation: Coords = { xYards: 95, yYards: 95 };
  const landingSpot: Coords = { xYards: 90, yYards: 95 };
  const obSpot: Coords = { xYards: 0, yYards: 100 };
  const shotHistory: ShotHistory[][] = [
    [
      {
        result: {
          source: teeLocation,
          landingSpot: obSpot,
          startDegrees: 45,
          endDegrees: 45,
        },
        terrainFrom: Terrain.Fairway,
        terrainTo: Terrain.OutOfBounds,
        strokes: 2,
      },
      {
        result: {
          source: teeLocation,
          landingSpot,
          startDegrees: 45,
          endDegrees: 45,
        },
        terrainFrom: Terrain.Fairway,
        terrainTo: Terrain.Green,
        strokes: 1,
      },
      {
        result: {
          source: landingSpot,
          landingSpot: pinLocation,
          startDegrees: 45,
          endDegrees: 45,
        },
        terrainFrom: Terrain.Green,
        terrainTo: Terrain.Hole,
        strokes: 1,
      },
    ],
  ];

  const course: CourseData = {
    name: 'testCourse',
    holes: [
      {
        holeNumber: 1,
        par: 3,
        imgSrcURL: 'imgsrc',
        widthYards: 100,
        heightYards: 100,
        imgPixelsPerYard: 10,
        teeLocations: { white: teeLocation },
        pinLocations: [{ xYards: 95, yYards: 95 }],
      },
    ],
  };

  render(<Scorecard course={course} shotsTaken={shotHistory} activeHole={1} />);

  const scoreDivs = screen.getAllByText('4');

  expect(scoreDivs).toHaveLength(2);
  expect(scoreDivs[0]).toBeInTheDocument();
});
