import React, { useState } from 'react';
import { Container, Sprite, Stage } from '@pixi/react';

import Circle from 'components/drawing/Circle';
import ShotTracer from 'components/drawing/ShotTracer';
import TerrainSVG from 'components/TerrainSVG';
import YardageMeasurement from 'components/drawing/YardageMeasurement';

import { Terrain } from 'lib/terrain';

import styles from './HoleView.module.css';
import { feetBetween } from 'lib/coords';

export interface HoleProps {
  // Data to build view
  data: HoleData;
  bag: Shot[];
  shotsTaken: ShotHistory[];
  tees: Tees;
  pinLocationIndex: number;
  ballLocation: Coords;

  // Handlers for interaction
  onClick: (target: Coords) => void;
}

const Hole = ({
  data,
  tees,
  pinLocationIndex,
  ballLocation,
  shotsTaken,
  onClick,
}: HoleProps) => {
  const pinLocation = data.pinLocations[pinLocationIndex];
  const teeLocation = data.teeLocations[tees.name];

  const [mouseCoords, setMouseCoords] = useState<Coords>({
    xYards: 0,
    yYards: 0,
  });

  const [mouseIsInside, setMouseIsInside] = useState<boolean>(false);

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

  const handleMouseEnter = () => {
    setMouseIsInside(true);
  };

  const handleMouseLeave = () => {
    setMouseIsInside(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const target: Coords = {
      xYards: (e.pageX - rect.left) / overallScale,
      yYards: (e.pageY - rect.top) / overallScale,
    };

    onClick(target);
  };

  const pinRadius = 5 / overallScale;
  const teeMarkerRadius = 5 / overallScale;

  return (
    <React.Fragment>
      <Stage
        className={styles.HoleView}
        width={holeViewWidthPixels}
        height={holeViewHeightPixels}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        options={{
          backgroundAlpha: 1,
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
          {shotsTaken.map((shot, i) => (
            <ShotTracer
              key={i}
              result={shot.result}
              destinationText={
                shot.terrainTo === Terrain.Hole
                  ? Math.max(
                      1,
                      Math.floor(
                        feetBetween(shot.result.landingSpot, pinLocation)
                      )
                    ).toFixed(0) + "'"
                  : shot.terrainTo
              }
            />
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
            fillColor={tees.color ?? tees.name}
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
            holeComplete || !mouseIsInside ? null : (
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
