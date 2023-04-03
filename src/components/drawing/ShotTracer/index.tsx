import React from 'react';
import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

export interface ShotTracerProps {
  shotResult: ShotResult;
}

const ShotTracer = ({ shotResult }: ShotTracerProps) => {
  const midpointXYards =
    (shotResult.source.xYards + shotResult.landingSpot.xYards) / 2;
  const midpointYYards =
    (shotResult.source.yYards + shotResult.landingSpot.yYards) / 2;

  const diffX = shotResult.source.xYards - shotResult.landingSpot.xYards;
  const diffY = shotResult.source.yYards - shotResult.landingSpot.yYards;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const rotation = Math.atan(diffY / diffX);

  return (
    <React.Fragment>
      <Container>
        <Text
          text={distance.toFixed(0) + ' yd'}
          rotation={rotation}
          x={midpointXYards}
          y={midpointYYards}
          anchor={[0.5, 0]}
          style={
            new TextStyle({
              fill: 'orange',
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
