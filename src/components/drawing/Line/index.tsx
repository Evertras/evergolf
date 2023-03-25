import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

export interface LineProps {
  start: Coords;
  end: Coords;
  color: ColorSource;
  thickness: number;
}

const Line = (props: LineProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.lineStyle(props.thickness, props.color);
      g.moveTo(props.start.xYards, props.start.yYards);
      g.lineTo(props.end.xYards, props.end.yYards);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Line;
