import React, { useState } from 'react';
import { TextStyle } from 'pixi.js';
import { Container, Sprite, Stage, Text } from '@pixi/react';
import './Hole.css';
import Circle from 'components/drawing/Circle';
import YardageMeasurement from 'components/drawing/YardageMeasurement';
import { terrainAtPoint, terrainSVGID } from 'lib/terrain';

import { ReactComponent as HoleSVG } from 'data/course/chiba-shimin/hole-1.svg';
import { radiansToDegrees } from 'lib/math';
import { hitShot } from 'lib/shots';

export interface HoleProps {
  data: HoleData;
}

const Hole = ({ data }: HoleProps) => {
  // TODO: Select somehow
  const pinLocation = data.pinLocations[0];
  const teeLocation = data.teeLocations.white;

  const [mouseCoords, setMouseCoords] = useState<Coords>({
    xYards: 0,
    yYards: 0,
  });

  const [ballLocation, setBallLocation] = useState<Coords>({
    xYards: teeLocation.xYards,
    yYards: teeLocation.yYards,
  });

  const holeViewWidthPixels = 1000;
  const holeViewHeightPixels = 600;

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
    const rect = e.currentTarget.getBoundingClientRect();
    const target: Coords = {
      xYards: (e.pageX - rect.left) / overallScale,
      yYards: (e.pageY - rect.top) / overallScale,
    };

    const xDiff = target.xYards - ballLocation.xYards;
    const yDiff = target.yYards - ballLocation.yYards;

    const targetDegrees = radiansToDegrees(Math.atan2(yDiff, xDiff));

    const shot: Shot = {
      potentialOutcomes: [
        {
          startDegreesLeftmost: 0,
          startDegreesRightmost: 0,
          sidespinDegreeLeftmost: 0,
          sidespinDegreeRightmost: 0,
          carryYardsMin: 50,
          carryYardsMax: 50,
        },
      ],
    };

    const shotResult = hitShot(shot, ballLocation, targetDegrees);

    setBallLocation(shotResult.landingSpot);
  };

  const pinRadius = 5 / overallScale;
  const teeMarkerRadius = 5 / overallScale;

  let terrain = terrainAtPoint(mouseCoords, imgScale);

  const debugText =
    'Pos: (' +
    mouseCoords.xYards.toFixed(0) +
    ', ' +
    mouseCoords.yYards.toFixed(0) +
    ')\nTerrain: ' +
    terrain;

  return (
    <React.Fragment>
      <div>千葉市民ゴルフ＃１</div>
      <Stage
        width={holeViewWidthPixels}
        height={holeViewHeightPixels}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        options={{
          backgroundAlpha: 0,
        }}
      >
        <Container interactiveChildren={false} scale={overallScale}>
          <Sprite
            image={data.imgSrcURL}
            anchor={{ x: 0, y: 0 }}
            scale={imgScale}
          />
          <Circle loc={pinLocation} radiusPixels={pinRadius} fillColor="cyan" />
          <Circle
            loc={teeLocation}
            radiusPixels={teeMarkerRadius}
            fillColor="white"
          />
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
        <Container interactiveChildren={false} x={0} y={400}>
          <Text
            text={debugText}
            style={
              new TextStyle({
                fill: 'white',
              })
            }
          />
        </Container>
      </Stage>
      <HoleSVG
        id={terrainSVGID}
        height={1}
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
      />
    </React.Fragment>
  );
};

export default Hole;
