import React from 'react';
import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import Bezier from '../Bezier';
import Circle from '../Circle';
import { degreesToRadians } from 'lib/math';

export interface ShotTracerProps {
  shotResult: ShotResult;
}

const ShotTracer = ({ shotResult }: ShotTracerProps) => {
  const diffX = shotResult.source.xYards - shotResult.landingSpot.xYards;
  const diffY = shotResult.source.yYards - shotResult.landingSpot.yYards;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const rotation = Math.atan(diffY / diffX);

  const startRadians = degreesToRadians(shotResult.startDegrees);
  const startingDirectionUnit = {
    xYards: Math.cos(startRadians),
    yYards: Math.sin(startRadians),
  };

  const controlPoint: Coords = {
    xYards:
      startingDirectionUnit.xYards * distance * 0.5 + shotResult.source.xYards,
    yYards:
      startingDirectionUnit.yYards * distance * 0.5 + shotResult.source.yYards,
  };

  const color = 'orange';

  return (
    <React.Fragment>
      <Container>
        <Bezier
          start={shotResult.source}
          end={shotResult.landingSpot}
          controlPoint={controlPoint}
          color={color}
          thickness={2}
        />
        <Circle
          loc={shotResult.source}
          radiusPixels={2}
          fillColor={color}
          strokeColor={'gray'}
        />
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
      </Container>
    </React.Fragment>
  );
};

export default ShotTracer;
