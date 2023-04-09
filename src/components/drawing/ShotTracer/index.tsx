import React from 'react';
import { Container, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';
import Bezier from '../Bezier';
import Circle from '../Circle';
import { degreesToRadians } from 'lib/math';
import { Terrain } from 'lib/terrain';
import { feetBetween } from 'lib/coords';

export interface ShotTracerProps {
  shot: ShotHistory;
  pinLocation: Coords;
}

const ShotTracer = ({ shot, pinLocation }: ShotTracerProps) => {
  const diffX = shot.result.source.xYards - shot.result.landingSpot.xYards;
  const diffY = shot.result.source.yYards - shot.result.landingSpot.yYards;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const rotation = Math.atan(diffY / diffX);

  const startRadians = degreesToRadians(shot.result.startDegrees);
  const startingDirectionUnit = {
    xYards: Math.cos(startRadians),
    yYards: Math.sin(startRadians),
  };

  const controlPoint: Coords = {
    xYards:
      startingDirectionUnit.xYards * distance * 0.5 + shot.result.source.xYards,
    yYards:
      startingDirectionUnit.yYards * distance * 0.5 + shot.result.source.yYards,
  };

  const color = 'orange';

  return (
    <React.Fragment>
      <Container>
        <Bezier
          start={shot.result.source}
          end={shot.result.landingSpot}
          controlPoint={controlPoint}
          color={color}
          thickness={2}
        />
        <Circle
          loc={shot.result.source}
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

        {shot.terrainTo === Terrain.Hole ? (
          <Text
            text={
              Math.max(
                1,
                Math.floor(feetBetween(shot.result.landingSpot, pinLocation))
              ).toFixed(0) + "'"
            }
            x={shot.result.landingSpot.xYards}
            y={shot.result.landingSpot.yYards}
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
        ) : (
          <Text
            text={shot.terrainTo}
            x={shot.result.landingSpot.xYards}
            y={shot.result.landingSpot.yYards}
            anchor={[0.5, 1]}
            style={
              new TextStyle({
                fill: color,
                stroke: 'black',
                strokeThickness: 2,
                fontSize: '6pt',
              })
            }
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default ShotTracer;
