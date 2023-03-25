import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

export interface CircleProps {
  loc: Coords;
  radiusPixels: number;
  fillColor?: ColorSource;
  strokeColor?: ColorSource;
  strokeThickness?: number;
}

const Circle = (props: CircleProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.beginFill(props.fillColor || 'white', props.fillColor ? 1 : 0);
      g.lineStyle(props.strokeThickness || 1, props.strokeColor || 'black');
      g.drawCircle(props.loc.xYards, props.loc.yYards, props.radiusPixels);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Circle;
