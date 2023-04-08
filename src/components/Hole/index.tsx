import React, { useState } from 'react';
import { Container, Sprite, Stage } from '@pixi/react';
import Circle from 'components/drawing/Circle';
import YardageMeasurement from 'components/drawing/YardageMeasurement';
import { isTerrainHittableFrom, Terrain, terrainAtPoint } from 'lib/terrain';

import { radiansToDegrees } from 'lib/math';
import { approachShot, hitShot, putt } from 'lib/shots';
import ShotSelector from 'components/ShotSelector';
import ShotTracer from 'components/drawing/ShotTracer';
import TerrainSVG from 'components/TerrainSVG';
import { feetBetween, yardsBetween } from 'lib/coords';

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

    let terrainFrom =
      hittableShots.length > 0
        ? hittableShots[hittableShots.length - 1].terrainTo
        : Terrain.Fairway;
    let terrainTo = terrainAtPoint(result.landingSpot, imgScale);
    const strokes = terrainTo === Terrain.OutOfBounds ? 2 : 1;

    takeShot({
      result,
      strokes,
      terrainFrom,
      terrainTo,
    });

    // TODO: Figure out better from bag, or redo this when we tackle short game
    const minDistance = 80;

    // Auto approach (with a short circuit safety valve to avoid infinite)
    let approachAttempts = 0;
    let approachFrom = result.landingSpot;
    let location = result.landingSpot;

    while (
      terrainTo !== Terrain.Green &&
      yardsBetween(result.landingSpot, pinLocation) < minDistance &&
      approachAttempts < 10
    ) {
      approachAttempts++;

      // TODO: use separate short game handicap for approximating
      const approachResult = approachShot(
        approachFrom,
        pinLocation,
        puttingHandicap
      );
      terrainFrom = terrainAtPoint(location, imgScale);
      terrainTo = terrainAtPoint(approachResult.landingSpot, imgScale);
      location = approachResult.landingSpot;
      approachFrom = location;

      takeShot({
        result: approachResult,
        strokes: 1,
        terrainFrom,
        terrainTo,
      });
    }

    if (terrainTo === Terrain.Green) {
      // Auto putt out
      const putts = putt(
        feetBetween(result.landingSpot, pinLocation),
        puttingHandicap
      );

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
            holeComplete ? null : (
              <React.Fragment>
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
              </React.Fragment>
            )
          }
        </Container>
      </Stage>
      <TerrainSVG holeNumber={data.holeNumber} />
    </React.Fragment>
  );
};

export default Hole;
