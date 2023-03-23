import React, {useState} from 'react';
import pin from "./pin.svg"
import "./Hole.css"

export interface HoleProps {
  imgSrc: string;
}

const Hole = (props: HoleProps) => {
  const [mouseCoords, setMouseCoords] = useState({
    xFractional: 0,
    yFractional: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;
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
      <div className="container">
        <img
          src={props.imgSrc}
          alt={props.imgSrc}
          onMouseMove={handleMouseMove}
        />
        <img
          src={pin}
          alt="pin"
          className="pin"
          style={{
            left: xPercent + "%",
            top: yPercent + "%",
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Hole;
