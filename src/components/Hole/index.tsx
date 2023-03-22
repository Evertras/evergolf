import React from 'react';

export interface HoleProps {
  imgSrc: string;
}

const Hole = (props: HoleProps) => {
  return (
    <React.Fragment>
      <img src={props.imgSrc} alt={props.imgSrc} />
    </React.Fragment>
  );
};

export default Hole;
