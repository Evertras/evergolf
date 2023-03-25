import React, {useCallback, useState} from 'react';
import {TextStyle, Graphics as PIXIGraphics, ColorSource} from 'pixi.js';
import {Container, Graphics, Sprite, Stage, Text} from '@pixi/react';
import './Hole.css';

export interface CircleProps {
  loc: Coords;
  radiusPixels: number;
  color: ColorSource;
}

const Circle = (props: CircleProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.beginFill(props.color);
      g.lineStyle(0.5, "white");
      g.drawCircle(props.loc.xYards, props.loc.yYards, props.radiusPixels);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export interface HoleProps {
  data: HoleData;
}

const Hole = ({data}: HoleProps) => {
  /*
  const [mouseCoords, setMouseCoords] = useState({
    xFractional: 0,
    yFractional: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
    const width = e.currentTarget.width;
    const height = e.currentTarget.height;

    setMouseCoords({
      xFractional: x / width,
      yFractional: y / height,
    });
  };

  const xPercent = (mouseCoords.xFractional * 100).toFixed(1);
  const yPercent = (mouseCoords.yFractional * 100).toFixed(1);
  */

  const holeViewWidthPixels = 1000;
  const holeViewHeightPixels = 600;

  const imgScale = 1 / data.imgPixelsPerYard;
  const overallScale = Math.min(
    holeViewWidthPixels / data.widthYards,
    holeViewHeightPixels / data.heightYards,
  );

  const pinRadius = 5 / overallScale;
  const teeMarkerRadius = 5 / overallScale;

  return (
    <React.Fragment>
      <div>
        千葉市民ゴルフ＃１
      </div>
      <Stage
        width={holeViewWidthPixels}
        height={holeViewHeightPixels}
        options={
          {
            //backgroundAlpha: 0,
          }
        }
      >
        <Container scale={overallScale}>
          <Sprite
            image={data.imgSrcURL}
            anchor={{x: 0, y: 0}}
            scale={imgScale}
          />
          <Circle
            loc={data.pinLocations[0]}
            radiusPixels={pinRadius}
            color="cyan"
          />
          <Circle
            loc={data.teeLocations.white}
            radiusPixels={teeMarkerRadius}
            color="white"
          />
        </Container>
        <Container x={400} y={500}>
        </Container>
      </Stage>
    </React.Fragment>
  );
};

export default Hole;
