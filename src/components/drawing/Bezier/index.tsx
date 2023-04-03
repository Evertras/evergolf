import { ColorSource, Graphics as PIXIGraphics } from 'pixi.js';
import { Graphics } from '@pixi/react';
import { useCallback } from 'react';

export interface BezierProps {
  start: Coords;
  end: Coords;
  controlPoint: Coords;
  color: ColorSource;
  thickness: number;
}

const Bezier = (props: BezierProps) => {
  const draw = useCallback(
    (g: PIXIGraphics) => {
      g.clear();
      g.lineStyle(props.thickness, props.color);
      g.moveTo(props.start.xYards, props.start.yYards);
      g.bezierCurveTo(
        props.controlPoint.xYards,
        props.controlPoint.yYards,
        props.controlPoint.xYards,
        props.controlPoint.yYards,
        props.end.xYards,
        props.end.yYards
      );
      g.endFill();
    },
    [props]
  );

  return <Graphics draw={draw} />;
};

export default Bezier;
