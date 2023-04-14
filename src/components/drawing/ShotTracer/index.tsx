import React from 'react';
import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import Bezier from '../Bezier';
import Circle from '../Circle';
import { degreesToRadians } from 'lib/math';

export interface ShotTracerProps {
  result: ShotResult;
  destinationText?: string;
  showDistance: boolean;
}

const ShotTracer = ({
  result,
  destinationText,
  showDistance,
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

  const controlPoint: Coords = {
    xYards:
      startingDirectionUnit.xYards * distance * 0.5 + result.source.xYards,
    yYards:
      startingDirectionUnit.yYards * distance * 0.5 + result.source.yYards,
  };

  const color = 'orange';

  return (
    <React.Fragment>
      <Container>
        <Bezier
          start={result.source}
          end={result.landingSpot}
          controlPoint={controlPoint}
          color={color}
          thickness={2}
        />
        <Circle
          loc={result.source}
          radiusPixels={2}
          fillColor={color}
          strokeColor={'gray'}
        />

        {showDistance ? (
          <Text
            text={distance.toFixed(0) + ' yd'}
            rotation={rotation}
            x={controlPoint.xYards}
            y={controlPoint.yYards}
            anchor={[0.5, 0.5]}
            style={
              new TextStyle({
                fill: color,
                stroke: 'black',
                strokeThickness: 2,
                fontSize: '6pt',
              })
            }
          />
        ) : null}

        {destinationText ? (
          <Text
            text={destinationText}
            x={result.landingSpot.xYards}
            y={result.landingSpot.yYards}
            anchor={[0.5, 0]}
            style={
              new TextStyle({
                fill: color,
                stroke: 'black',
                strokeThickness: 2,
                fontSize: '6pt',
              })
            }
          />
        ) : null}
      </Container>
    </React.Fragment>
  );
};

export default ShotTracer;
