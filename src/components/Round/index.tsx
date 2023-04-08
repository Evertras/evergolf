import Hole from 'components/Hole';
import Scorecard from 'components/Scorecard';
import React, { useState } from 'react';
import styles from './Round.module.css';

export interface RoundProps {
  bag: Shot[];
  course: CourseData;
}

const Round = ({ bag, course }: RoundProps) => {
  const [currentHoleNumber, setCurrentHoleNumber] = useState(1);

  const [shotHistoryByHole, setShotHistoryByHole] = useState(
    Array.from({ length: course.holes.length }, (): ShotHistory[] => [])
  );

  const currentHoleData = course.holes[currentHoleNumber - 1];

  const goBack = () => {
    if (currentHoleNumber === 1) {
      setCurrentHoleNumber(course.holes.length);
    } else {
      setCurrentHoleNumber(currentHoleNumber - 1);
    }
  };

  const goForward = () => {
    if (currentHoleNumber === course.holes.length) {
      setCurrentHoleNumber(1);
    } else {
      setCurrentHoleNumber(currentHoleNumber + 1);
    }
  };

  const resetHole = () => {
    const copied = [...shotHistoryByHole];
    copied[currentHoleNumber - 1] = [];
    setShotHistoryByHole(copied);
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
      <div className={styles.roundToolbar}>
        <div onMouseDown={goBack}>{'<'}</div>
        <div onMouseDown={resetHole}>Reset</div>
        <div onMouseDown={goForward}>{'>'}</div>
      </div>
      <Hole
        bag={bag}
        data={currentHoleData}
        shotsTaken={shotHistoryByHole[currentHoleNumber - 1]}
        takeShot={takeShot}
      />
      <Scorecard course={course} shotsTaken={shotHistoryByHole} />
    </React.Fragment>
  );
};

export default Round;
