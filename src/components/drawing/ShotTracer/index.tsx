import React from 'react';
import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import Bezier from '../Bezier';
import Circle from '../Circle';
import { degreesToRadians } from 'lib/math';
import { scaledByPixels } from 'lib/coords';

export interface ShotTracerProps {
  result: ShotResult;
  destinationText?: string;
  showDistance: boolean;
  pixelsPerYard: number;
}

const ShotTracer = ({
  result,
  destinationText,
  showDistance,
  pixelsPerYard,
}: ShotTracerProps) => {
  const diffX = result.source.xYards - result.landingSpot.xYards;
  const diffY = result.source.yYards - result.landingSpot.yYards;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const rotation = Math.atan(diffY / diffX);

  const startRadians = degreesToRadians(result.startDegrees);
  const startingDirectionUnit = {
    xYards: Math.cos(startRadians),
    yYards: Math.sin(startRadians),
  };

  const controlPoint: CoordsPixels = {
    xPixels:
      (startingDirectionUnit.xYards * distance * 0.5 + result.source.xYards) *
      pixelsPerYard,
    yPixels:
      (startingDirectionUnit.yYards * distance * 0.5 + result.source.yYards) *
      pixelsPerYard,
  };

  const color = 'orange';

  const sourcePixels = scaledByPixels(result.source, pixelsPerYard);
  const landingSpotPixels = scaledByPixels(result.landingSpot, pixelsPerYard);

  return (
    <React.Fragment>
      <Container>
        <Bezier
          start={sourcePixels}
          end={landingSpotPixels}
          controlPoint={controlPoint}
          color={color}
          thickness={2}
        />
        <Circle
          loc={sourcePixels}
          radiusPixels={2}
          fillColor={color}
          strokeColor={'gray'}
        />

        {showDistance ? (
          <Text
            text={distance.toFixed(0) + ' yd'}
            rotation={rotation}
            x={controlPoint.xPixels}
            y={controlPoint.yPixels}
            anchor={[0.5, 0.5]}
            style={
              new TextStyle({
                fill: color,
                stroke: 'black',
                strokeThickness: 2,
                fontSize: '14pt',
              })
            }
          />
        ) : null}

        {destinationText ? (
          <Text
            text={destinationText}
            x={result.landingSpot.xYards * pixelsPerYard}
            y={result.landingSpot.yYards * pixelsPerYard}
            anchor={[0.5, 0]}
            style={
              new TextStyle({
                fill: color,
                stroke: 'black',
                strokeThickness: 2,
                fontSize: '14pt',
              })
            }
          />
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default ShotTracer;
