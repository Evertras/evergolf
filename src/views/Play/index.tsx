import React, { useState } from 'react';

import styles from './Play.module.css';

import Round from 'components/Round';
import TeeSelector from 'components/TeeSelector';

import chibaShimin from 'data/course/chiba-shimin/course.json';
import { basicBag } from 'lib/shots/basic-bag';

const Play = () => {
  const [tees, setTees] = useState(chibaShimin.tees[1]);
  const [roundNumber, setRoundNumber] = useState(1);

  const resetRound = () => {
    setRoundNumber(roundNumber + 1);
  };

  return (
    <React.Fragment>
      <div className={styles.Play}>
        <Round
          key={roundNumber}
          bag={basicBag}
          course={chibaShimin}
          selectedTees={tees}
          pinLocationIndex={0}
        />
        <TeeSelector
          tees={chibaShimin.tees}
          currentSelection={tees}
          onSelect={setTees}
        />
        <div className={styles.DebugToolbar}>
          <div onMouseDown={resetRound}>Reset</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Play;
