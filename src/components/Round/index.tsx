import Hole from 'components/Hole';
import React from 'react';

export interface RoundProps {
  bag: Shot[];
  course: CourseData;
}

const Round = ({ bag, course }: RoundProps) => {
  const currentHole = course.holes[1];

  return (
    <React.Fragment>
      <h2>
        {course.name} #{currentHole.holeNumber} (Par {currentHole.par})
      </h2>
      <Hole bag={bag} data={currentHole} />
    </React.Fragment>
  );
};

export default Round;
