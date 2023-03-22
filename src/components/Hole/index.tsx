import React, { useState } from 'react';

export interface HoleProps {
  imgSrc: string;
}

const Hole = (props: HoleProps) => {
  const [mouseCoords, setMouseCoords] = useState({
    xFractional: 0,
    yFractional: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const x = e.pageX - e.currentTarget.offsetLeft;
    const y = e.pageY - e.currentTarget.offsetTop;
    const width = e.currentTarget.width;
    const height = e.currentTarget.height;

    setMouseCoords({
      xFractional: x / width,
      yFractional: y / height,
    });
  };

  const xPercent = (mouseCoords.xFractional * 100).toFixed(1);
  const yPercent = (mouseCoords.yFractional * 100).toFixed(1);

  return (
    <React.Fragment>
      <div>
        X: {xPercent}%, Y: {yPercent}%
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
