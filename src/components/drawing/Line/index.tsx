import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

export interface LineProps {
  start: CoordsPixels;
  end: CoordsPixels;
  color: ColorSource;
  thickness: number;
}

const Line = (props: LineProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.lineStyle(props.thickness, props.color);
      g.moveTo(props.start.xPixels, props.start.yPixels);
      g.lineTo(props.end.xPixels, props.end.yPixels);
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Line;
