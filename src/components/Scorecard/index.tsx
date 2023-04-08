import React from 'react';
import styles from './Scorecard.module.css';

export interface ScorecardProps {
  course: CourseData;
  shotsTaken: ShotHistory[][];
}

const Scorecard = ({ course, shotsTaken }: ScorecardProps) => {
  const scores = shotsTaken.map((hist) =>
    (hist || []).reduce((total, s) => total + s.strokes, 0)
  );

  return (
    <React.Fragment>
      <div>Score</div>
      <table className={styles.scorecardTable}>
        <thead>
          <tr>
            <th>Hole</th>
            {course.holes.map((hole, i) => (
              <th key={i}>{hole.holeNumber}</th>
            ))}
          </tr>
          <tr>
            <th>Par</th>
            {course.holes.map((hole, i) => (
              <th key={i}>{hole.par}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Score</td>
            {scores.map((score, i) => (
              <td key={i}>{score}</td>
            ))}
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Scorecard;
