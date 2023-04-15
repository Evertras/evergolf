import React, { useState } from 'react';
import { Container, Sprite, Stage } from '@pixi/react';

import Circle from 'components/drawing/Circle';
import ShotTracer from 'components/drawing/ShotTracer';
import TerrainSVG from 'components/TerrainSVG';
import YardageMeasurement from 'components/drawing/YardageMeasurement';

import { Terrain } from 'lib/terrain';

import styles from './HoleView.module.css';
import { feetBetween, scaledByPixels } from 'lib/coords';

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

  const pixelsPerYard = Math.min(
    holeViewWidthPixels / data.widthYards,
    holeViewHeightPixels / data.heightYards
  );
  const imgScale = (1 / data.imgPixelsPerYard) * pixelsPerYard;

  const ballLocationPixels = scaledByPixels(ballLocation, pixelsPerYard);
  const pinLocationPixels = scaledByPixels(pinLocation, pixelsPerYard);
  const teeLocationPixels = scaledByPixels(teeLocation, pixelsPerYard);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;

    setMouseCoords({
      xYards: x / pixelsPerYard,
      yYards: y / pixelsPerYard,
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
      xYards: (e.pageX - rect.left) / pixelsPerYard,
      yYards: (e.pageY - rect.top) / pixelsPerYard,
    };

    onClick(target);
  };

  const pinRadiusPixels = 5;
  const teeMarkerRadius = 5;

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
        <Container interactiveChildren={false}>
          <Sprite
            image={data.imgSrcURL}
            anchor={{ x: 0, y: 0 }}
            scale={imgScale}
          />

          {
            // Shot tracers
          }
          {shotsTaken.map((shot, i) => {
            let destinationText = '';

            switch (shot.terrainTo) {
              case Terrain.Green:
                break;

              case Terrain.Hole:
                destinationText =
                  Math.max(
                    1,
                    Math.floor(
                      feetBetween(shot.result.landingSpot, pinLocation)
                    )
                  ).toFixed(0) + "'";
                break;

              default:
                destinationText = shot.terrainTo;
            }

            return (
              <ShotTracer
                key={i}
                result={shot.result}
                showDistance={true}
                pixelsPerYard={pixelsPerYard}
                destinationText={destinationText}
              />
            );
          })}

          {
            // Pin
          }
          <Circle
            loc={pinLocationPixels}
            radiusPixels={pinRadiusPixels}
            fillColor="cyan"
          />

          {
            // Tees
          }
          <Circle
            loc={teeLocationPixels}
            radiusPixels={teeMarkerRadius}
            fillColor={tees.color ?? tees.name}
          />

          {
            // Ball
          }
          <Circle
            loc={ballLocationPixels}
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
                  pixelsPerYard={pixelsPerYard}
                  color="white"
                  textColor="white"
                  showRings={true}
                  thickness={1}
                />
                <YardageMeasurement
                  start={pinLocation}
                  end={mouseCoords}
                  pixelsPerYard={pixelsPerYard}
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
