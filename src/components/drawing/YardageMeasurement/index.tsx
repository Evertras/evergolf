import React from 'react';
import { Container, Text } from '@pixi/react';
import { ColorSource, TextStyle, TextStyleFill } from 'pixi.js';
import Line from '../Line';
import Arc from '../Arc';
import { scaledByPixels } from 'lib/coords';

export interface YardageMeasurementProps {
  start: Coords;
  end: Coords;
  pixelsPerYard: number;
  color: ColorSource;
  thickness: number;
  textColor: TextStyleFill;
  showRings: boolean;
}

const YardageMeasurement = ({
  start,
  end,
  pixelsPerYard,
  color,
  thickness,
  textColor,
  showRings,
}: YardageMeasurementProps) => {
  const midpointXYards = (start.xYards + end.xYards) / 2;
  const midpointYYards = (start.yYards + end.yYards) / 2;

  const diffX = start.xYards - end.xYards;
  const diffY = start.yYards - end.yYards;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const rotation = Math.atan(diffY / diffX);

  const degreesOff = 5;
  const radiansOff = degreesOff * (Math.PI / 180);
  let startAngle = rotation - radiansOff;
  let endAngle = rotation + radiansOff;

  const startPixels = scaledByPixels(start, pixelsPerYard);
  const endPixels = scaledByPixels(end, pixelsPerYard);

  if (diffX > 0) {
    startAngle = startAngle + Math.PI;
    endAngle = endAngle + Math.PI;
  }

  return (
    <React.Fragment>
      <Container>
        <Line
          start={startPixels}
          end={endPixels}
          color={color}
          thickness={thickness}
        />
        {showRings &&
          [...Array(Math.floor(distance / 50))].map((_, i) => (
            <Arc
              key={i}
              loc={startPixels}
              radiusPixels={(i + 1) * 50 * pixelsPerYard}
              strokeColor={color}
              strokeThickness={thickness / 2}
              startAngle={startAngle}
              endAngle={endAngle}
            />
          ))}
        {showRings && (
          <Arc
            loc={startPixels}
            radiusPixels={distance * pixelsPerYard}
            strokeColor={color}
            strokeThickness={thickness * 1.5}
            startAngle={startAngle}
            endAngle={endAngle}
          />
        )}
        <Text
          text={distance.toFixed(0) + ' yd'}
          rotation={rotation}
          x={midpointXYards * pixelsPerYard}
          y={midpointYYards * pixelsPerYard}
          anchor={[0.5, 0]}
          style={
            new TextStyle({
              fill: textColor,
              stroke: 'black',
              strokeThickness: 2,
              fontSize: '16pt',
            })
          }
        />
      </Container>
    </React.Fragment>
  );
};

export default YardageMeasurement;
