import Hole from 'components/Hole';
import Scorecard from 'components/Scorecard';
import React, { useState } from 'react';
//import styles from './Round.module.css';

export interface RoundProps {
  bag: Shot[];
  course: CourseData;
  selectedTees: Tees;
  puttingHandicap: number;
}

const Round = ({ bag, course, selectedTees, puttingHandicap }: RoundProps) => {
  const [currentHoleNumber, setCurrentHoleNumber] = useState(1);

  const [shotHistoryByHole, setShotHistoryByHole] = useState(
    Array.from({ length: course.holes.length }, (): ShotHistory[] => [])
  );

  const currentHoleData = course.holes[currentHoleNumber - 1];

  const goForward = () => {
    if (currentHoleNumber === course.holes.length) {
      setCurrentHoleNumber(1);
    } else {
      setCurrentHoleNumber(currentHoleNumber + 1);
    }
  };

  const takeShot = (shot: ShotHistory) => {
    const copied = [...shotHistoryByHole];
    copied[currentHoleNumber - 1].push(shot);
    setShotHistoryByHole(copied);
  };

  return (
    <React.Fragment>
      <h2>
        {course.name} #{currentHoleNumber} (Par {currentHoleData.par})
      </h2>
      <Hole
        advance={goForward}
        bag={bag}
        data={currentHoleData}
        shotsTaken={shotHistoryByHole[currentHoleNumber - 1]}
        takeShot={takeShot}
        tees={selectedTees}
        puttingHandicap={puttingHandicap}
      />
      <Scorecard
        course={course}
        activeHole={currentHoleNumber}
        shotsTaken={shotHistoryByHole}
        onClickHole={setCurrentHoleNumber}
      />
    </React.Fragment>
  );
};

export default Round;
