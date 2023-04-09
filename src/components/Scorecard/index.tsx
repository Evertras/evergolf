import RelativeScoreText from 'components/RelativeScoreText';
import { Terrain } from 'lib/terrain';
import React from 'react';
import styles from './Scorecard.module.css';

export interface ScorecardProps {
  course: CourseData;
  shotsTaken: ShotHistory[][];
  activeHole?: number;
  onClickHole?: (holeNumber: number) => void;
}

const Scorecard = ({
  course,
  shotsTaken,
  activeHole,
  onClickHole,
}: ScorecardProps) => {
  const isFinished = (hist: ShotHistory[]) =>
    hist && hist.length > 0 && hist[hist.length - 1].terrainTo === Terrain.Hole;

  const scores = shotsTaken.map((hist) =>
    hist.reduce((total, s) => total + s.strokes, 0)
  );

  const finishedHoles = shotsTaken.filter(isFinished);

  const totalPar = course.holes.reduce((total, hole) => total + hole.par, 0);
  const totalRelative = course.holes.reduce((total, hole, i) => {
    if (!isFinished(shotsTaken[i])) {
      return total;
    }

    const score = scores[i];

    return total + score - hole.par;
  }, 0);

  const totalScoreFinished = finishedHoles.reduce(
    (total, hist) => total + hist.reduce((total, s) => total + s.strokes, 0),
    0
  );

  const totalPutts = finishedHoles.reduce(
    (total, hist) => total + hist[hist.length - 1].strokes,
    0
  );

  const cellClass = (hole: number): string =>
    activeHole && activeHole === hole ? styles.activeHole : '';

  const mouseDownHandler = (hole: number): (() => void) => {
    return () => {
      if (onClickHole) {
        onClickHole(hole);
      }
    };
  };

  const cursorStyle = onClickHole ? 'pointer' : 'default';

  return (
    <React.Fragment>
      <div>Score</div>
      <table
        className={styles.scorecardTable}
        style={{
          cursor: cursorStyle,
        }}
      >
        <thead>
          <tr>
            <th>Hole</th>
            {course.holes.map((hole, i) => (
              <th
                key={i}
                onMouseDown={mouseDownHandler(hole.holeNumber)}
                className={cellClass(hole.holeNumber)}
              >
                {hole.holeNumber}
              </th>
            ))}
            <th>Total</th>
          </tr>
          <tr>
            <th>Par</th>
            {course.holes.map((hole, i) => (
              <th
                key={i}
                onMouseDown={mouseDownHandler(hole.holeNumber)}
                className={cellClass(hole.holeNumber)}
              >
                {hole.par}
              </th>
            ))}
            <th>{totalPar}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Score</td>
            {scores.map((score, i) => (
              <td
                key={i}
                onMouseDown={mouseDownHandler(i + 1)}
                className={cellClass(i + 1)}
              >
                <div className={styles.scoreAbsolute}>
                  {score > 0 ? score : '-'}
                </div>
                {shotsTaken[i].length > 0 &&
                shotsTaken[i][shotsTaken[i].length - 1].terrainTo ===
                  Terrain.Hole ? (
                  <div className={styles.scoreRelative}>
                    <RelativeScoreText
                      score={score}
                      par={course.holes[i].par}
                    />
                  </div>
                ) : null}
              </td>
            ))}
            <td>
              <div className={styles.scoreAbsolute}>{totalScoreFinished}</div>
              <div className={styles.scoreRelative}>
                <RelativeScoreText relativeScore={totalRelative} />
              </div>
            </td>
          </tr>
          <tr>
            <td>Putts</td>
            {shotsTaken.map((taken, i) => {
              const putts = taken.filter((s) => s.terrainTo === Terrain.Hole);
              return (
                <td
                  key={i}
                  onMouseDown={mouseDownHandler(i + 1)}
                  className={cellClass(i + 1)}
                >
                  {putts.length === 0 ? '-' : putts[0].strokes}
                </td>
              );
            })}
            <td>{totalPutts}</td>
          </tr>
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default Scorecard;
