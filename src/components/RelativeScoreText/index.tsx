import React from 'react';
import styles from './RelativeScoreText.module.css';

export interface RelativeScoreTextProps {
  par?: number;
  score?: number;
  relativeScore?: number;
}

const RelativeScoreText = ({
  score,
  par,
  relativeScore,
}: RelativeScoreTextProps) => {
  const relative = relativeScore ? relativeScore : (score ?? 0) - (par ?? 0);

  let relativeText = 'E';

  const style = relative >= 0 ? styles.scorePositive : styles.scoreNegative;

  if (relative > 0) {
    relativeText = '+' + relative;
  } else if (relative < 0) {
    relativeText = relative.toString(10);
  }

  return (
    <React.Fragment>
      <div className={style}>{relativeText}</div>
    </React.Fragment>
  );
};

export default RelativeScoreText;
