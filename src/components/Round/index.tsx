import Hole from 'components/Hole';
import React from 'react';

export interface RoundProps {
  bag: Shot[];
  course: CourseData;
}

const Round = ({ bag, course }: RoundProps) => {
  return (
    <React.Fragment>
      <Hole bag={bag} data={course.holes[1]} />
    </React.Fragment>
  );
};

export default Round;
