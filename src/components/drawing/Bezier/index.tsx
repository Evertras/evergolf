import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

export interface BezierProps {
  start: CoordsPixels;
  end: CoordsPixels;
  controlPoint: CoordsPixels;
  color: ColorSource;
  thickness: number;
}

const Bezier = (props: BezierProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.lineStyle(props.thickness, props.color);
      g.moveTo(props.start.xPixels, props.start.yPixels);
      g.bezierCurveTo(
        props.controlPoint.xPixels,
        props.controlPoint.yPixels,
        props.controlPoint.xPixels,
        props.controlPoint.yPixels,
        props.end.xPixels,
        props.end.yPixels
      );
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Bezier;
