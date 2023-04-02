import React, { useState } from 'react';
import { TextStyle } from 'pixi.js';
import { Container, Sprite, Stage, Text } from '@pixi/react';
import './Hole.css';
import Circle from 'components/drawing/Circle';
import YardageMeasurement from 'components/drawing/YardageMeasurement';
import { terrainAtPoint, terrainSVGID } from 'lib/terrain';

import { ReactComponent as HoleSVG } from 'data/course/chiba-shimin/hole-1.svg';

export interface HoleProps {
  data: HoleData;
}

const Hole = ({ data }: HoleProps) => {
  const [mouseCoords, setMouseCoords] = useState<Coords>({
    xYards: 0,
    yYards: 0,
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

  const pinRadius = 5 / overallScale;
  const teeMarkerRadius = 5 / overallScale;

  // TODO: Select somehow
  const pinLocation = data.pinLocations[0];
  const teeLocation = data.teeLocations.white;

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

          {
            // Measurement lines
          }
          <YardageMeasurement
            start={teeLocation}
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
