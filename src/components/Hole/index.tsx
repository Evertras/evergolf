import React, { useState } from 'react';
import { Container, Sprite, Stage } from '@pixi/react';
import Circle from 'components/drawing/Circle';
import YardageMeasurement from 'components/drawing/YardageMeasurement';
import { isTerrainHittableFrom, Terrain, terrainAtPoint } from 'lib/terrain';

import { radiansToDegrees } from 'lib/math';
import { hitShot, putt } from 'lib/shots';
import ShotSelector from 'components/ShotSelector';
import ShotTracer from 'components/drawing/ShotTracer';
import TerrainSVG from 'components/TerrainSVG';
import { feetBetween } from 'lib/coords';

export interface HoleProps {
  data: HoleData;
  bag: Shot[];
  shotsTaken: ShotHistory[];
  takeShot: (shot: ShotHistory) => void;
  tees: string;
  puttingHandicap: number;
}

const Hole = ({
  bag,
  data,
  shotsTaken,
  takeShot,
  tees,
  puttingHandicap,
}: HoleProps) => {
  // TODO: Select somehow
  const pinLocation = data.pinLocations[0];
  const teeLocation = data.teeLocations[tees];

  const [mouseCoords, setMouseCoords] = useState<Coords>({
    xYards: 0,
    yYards: 0,
  });

  const [selectedShotIndex, setSelectedShotIndex] = useState<number>(0);

  const hittableShots = shotsTaken.filter((s) =>
    isTerrainHittableFrom(s.terrainTo)
  );

  const ballLocation: Coords =
    hittableShots.length > 0
      ? hittableShots[hittableShots.length - 1].result.landingSpot
      : teeLocation;

  const currentScore = shotsTaken.reduce((total, s) => total + s.strokes, 0);

  const imgRatio = data.widthYards / data.heightYards;

  const holeViewWidthPixels = 1000;
  const holeViewHeightPixels = holeViewWidthPixels / imgRatio;
  const holeComplete =
    shotsTaken &&
    shotsTaken.length > 0 &&
    shotsTaken[shotsTaken.length - 1].terrainTo === Terrain.Hole;

  const imgScale = 1 / data.imgPixelsPerYard;
  const overallScale = Math.min(
    holeViewWidthPixels / data.widthYards,
    holeViewHeightPixels / data.heightYards
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;

    setMouseCoords({
      xYards: x / overallScale,
      yYards: y / overallScale,
    });
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    // We can only hit if we're still playing the hole
    if (holeComplete) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const target: Coords = {
      xYards: (e.pageX - rect.left) / overallScale,
      yYards: (e.pageY - rect.top) / overallScale,
    };

    const xDiff = target.xYards - ballLocation.xYards;
    const yDiff = target.yYards - ballLocation.yYards;

    const targetDegrees = radiansToDegrees(Math.atan2(yDiff, xDiff));

    const result = hitShot(bag[selectedShotIndex], ballLocation, targetDegrees);

    const terrainFrom =
      hittableShots.length > 0
        ? hittableShots[hittableShots.length - 1].terrainTo
        : Terrain.Fairway;
    const terrainTo = terrainAtPoint(result.landingSpot, imgScale);
    const strokes = terrainTo === Terrain.OutOfBounds ? 2 : 1;

    takeShot({
      result,
      strokes,
      terrainFrom,
      terrainTo,
    });

    // Auto putt out
    const putts = putt(
      feetBetween(result.landingSpot, pinLocation),
      puttingHandicap
    );

    if (terrainTo === Terrain.Green) {
      takeShot({
        result,
        strokes: putts,
        terrainFrom: Terrain.Green,
        terrainTo: Terrain.Hole,
      });
    }
  };

  const pinRadius = 5 / overallScale;
  const teeMarkerRadius = 5 / overallScale;

  const selectedShot = bag[selectedShotIndex];
  const expectedOutcome = selectedShot.potentialOutcomes[0];

  return (
    <React.Fragment>
      <div>
        Hitting {selectedShot.name} ({expectedOutcome.carryYardsMin} -{' '}
        {expectedOutcome.carryYardsMax} yd)
      </div>
      <div>Strokes: {currentScore}</div>
      <ShotSelector
        shots={bag}
        onSelectIndex={setSelectedShotIndex}
        currentSelectedIndex={selectedShotIndex}
      />
      <Stage
        width={holeViewWidthPixels}
        height={holeViewHeightPixels}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        options={{
          backgroundAlpha: 1,
          backgroundColor: 'darkgrey',
        }}
      >
        <Container interactiveChildren={false} scale={overallScale}>
          <Sprite
            image={data.imgSrcURL}
            anchor={{ x: 0, y: 0 }}
            scale={imgScale}
          />

          {
            // Shot tracers
          }
          {shotsTaken.map(({ result }, i) => (
            <ShotTracer key={i} shotResult={result} />
          ))}

          {
            // Pin
          }
          <Circle loc={pinLocation} radiusPixels={pinRadius} fillColor="cyan" />

          {
            // Tees
          }
          <Circle
            loc={teeLocation}
            radiusPixels={teeMarkerRadius}
            fillColor="white"
          />

          {
            // Ball
          }
          <Circle
            loc={ballLocation}
            radiusPixels={teeMarkerRadius}
            fillColor="white"
          />

          {
            // Measurement lines
          }
          <YardageMeasurement
            start={ballLocation}
            end={mouseCoords}
            color="white"
            textColor="white"
            showRings={true}
            thickness={1}
          />
          <YardageMeasurement
            start={pinLocation}
            end={mouseCoords}
            color="cyan"
            textColor="cyan"
            showRings={false}
            thickness={1}
          />
        </Container>
      </Stage>
      <TerrainSVG holeNumber={data.holeNumber} />
    </React.Fragment>
  );
};

export default Hole;
