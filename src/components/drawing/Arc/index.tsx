import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

export interface ArcProps {
  loc: Coords;
  radiusPixels: number;
  fillColor?: ColorSource;
  strokeColor?: ColorSource;
  strokeThickness?: number;
  startAngle: number;
  endAngle: number;
}

const Arc = (props: ArcProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.beginFill(props.fillColor || 'white', props.fillColor ? 1 : 0);
      g.lineStyle(props.strokeThickness || 1, props.strokeColor || 'black');
      g.arc(
        props.loc.xYards,
        props.loc.yYards,
        props.radiusPixels,
        props.startAngle,
        props.endAngle
      );
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Arc;
