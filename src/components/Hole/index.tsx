import React, { useState } from 'react';
import { TextStyle } from 'pixi.js';
import { Container, Sprite, Stage, Text } from '@pixi/react';
import './Hole.css';
import Circle from 'components/drawing/Circle';
import YardageMeasurement from 'components/drawing/YardageMeasurement';

export interface HoleProps {
  data: HoleData;
}

const Hole = ({ data }: HoleProps) => {
  const [mouseCoords, setMouseCoords] = useState({
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
    console.log(e);
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
        <Container scale={overallScale}>
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
        <Container x={0} y={400}>
          <Text
            text={
              'Pos: (' +
              mouseCoords.xYards.toFixed(0) +
              ', ' +
              mouseCoords.yYards.toFixed(0) +
              ')'
            }
            style={
              new TextStyle({
                fill: 'white',
              })
            }
          />
        </Container>
      </Stage>
    </React.Fragment>
  );
};

export default Hole;
