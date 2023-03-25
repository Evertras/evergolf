import React from 'react';
import { Container, Text } from '@pixi/react';
import { TextStyle, TextStyleFill } from 'pixi.js';
import Line, { LineProps } from '../Line';
import Circle from '../Circle';

export interface YardageMeasurementProps extends LineProps {
  textColor: TextStyleFill;
  showRings: boolean;
}

const YardageMeasurement = (props: YardageMeasurementProps) => {
  const midpointXYards = (props.start.xYards + props.end.xYards) / 2;
  const midpointYYards = (props.start.yYards + props.end.yYards) / 2;

  const diffX = props.start.xYards - props.end.xYards;
  const diffY = props.start.yYards - props.end.yYards;
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  const rotation = Math.atan(diffY / diffX);

  return (
    <React.Fragment>
      <Container>
        <Line {...props} />
        {props.showRings &&
          [...Array(Math.floor(distance / 50))].map((_, i) => (
            <Circle
              key={i}
              loc={props.start}
              radiusPixels={(i + 1) * 50}
              strokeColor={props.color}
              strokeThickness={1}
            />
          ))}
        {props.showRings && (
          <Circle
            loc={props.start}
            radiusPixels={distance}
            strokeColor={props.color}
            strokeThickness={3}
          />
        )}
        <Text
          text={distance.toFixed(0) + ' yd'}
          rotation={rotation}
          x={midpointXYards}
          y={midpointYYards}
          anchor={[0.5, 0]}
          style={
            new TextStyle({
              fill: props.textColor,
              stroke: 'black',
              strokeThickness: 2,
              fontSize: '10pt',
            })
          }
        />
      </Container>
    </React.Fragment>
  );
};

export default YardageMeasurement;
