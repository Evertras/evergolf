import React, { useCallback, useState } from 'react';
import { TextStyle, Graphics as PIXIGraphics } from 'pixi.js';
import { Container, Graphics, Sprite, Stage, Text } from '@pixi/react';
import './Hole.css';

export interface HoleProps {
  imgSrc: string;
}

export interface PinProps {
  x: number;
  y: number;
}

const Pin = (props: PinProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.beginFill(0xf00000);
      g.drawCircle(props.x, props.y, 10);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

const Hole = (props: HoleProps) => {
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

  return (
    <React.Fragment>
      <div>
        X: {xPercent}%, Y: {yPercent}%
      </div>
      <Stage
        width={1000}
        options={
          {
            //backgroundAlpha: 0,
          }
        }
      >
        <Sprite
          image={props.imgSrc}
          anchor={{ x: 0, y: 0 }}
          scale={[0.25, 0.25]}
        />
        <Pin x={300} y={400} />
        <Container x={400} y={500}>
          <Text
            text="Stuff"
            anchor={{ x: 0.5, y: 0.5 }}
            style={
              new TextStyle({
                fill: '0xfff',
              })
            }
          />
        </Container>
      </Stage>
    </React.Fragment>
  );
};

export default Hole;
