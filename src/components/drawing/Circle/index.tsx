import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

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
      g.lineStyle(0.5, 'white');
      g.drawCircle(props.loc.xYards, props.loc.yYards, props.radiusPixels);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Circle;
