import React, { useState } from 'react';
import styles from './App.module.css';
import GitHubLink from 'components/GitHubLink';
import chibaShimin from 'data/course/chiba-shimin/course.json';
import { basicBag } from 'lib/shots/basic-bag';
import Round from 'components/Round';
import TeeSelector from 'components/TeeSelector';

function App() {
  const [tees, setTees] = useState(chibaShimin.tees[1]);
  const [roundNumber, setRoundNumber] = useState(1);

  const resetRound = () => {
    setRoundNumber(roundNumber + 1);
  };

  return (
    <React.Fragment>
      <div className="App">
        <header className={styles.AppHeader}>
          <Round
            key={roundNumber}
            bag={basicBag}
            course={chibaShimin}
            selectedTees={tees}
            puttingHandicap={15}
          />
          <div className={styles.GitHubLogo}>
            <GitHubLink />
          </div>
          <div className={styles.TeeSelector}>
            <TeeSelector
              tees={chibaShimin.tees}
              currentSelection={tees}
              onSelect={setTees}
            />
          </div>
          <div className={styles.DebugToolbar}>
            <div onMouseDown={resetRound}>Reset</div>
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
