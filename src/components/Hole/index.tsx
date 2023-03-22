import React, { useState } from 'react';

export interface HoleProps {
  imgSrc: string;
}

const Hole = (props: HoleProps) => {
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    setMouseCoords({
      x: e.pageX - e.currentTarget.offsetLeft,
      y: e.pageY - e.currentTarget.offsetTop,
    });
  };

  return (
    <React.Fragment>
      <div>
        X: {mouseCoords.x}, Y: {mouseCoords.y}
      </div>
      <img
        src={props.imgSrc}
        alt={props.imgSrc}
        onMouseMove={handleMouseMove}
      />
    </React.Fragment>
  );
};

export default Hole;
