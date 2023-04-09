import React, { useState } from 'react';
import './App.css';
import GitHubLink from 'components/GitHubLink';
import chibaShimin from 'data/course/chiba-shimin/course.json';
import { basicBag } from 'lib/shots/basic-bag';
import Round from 'components/Round';
import TeeSelector from 'components/TeeSelector';

function App() {
  const [tees, setTees] = useState(chibaShimin.tees[1]);

  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Round
            bag={basicBag}
            course={chibaShimin}
            selectedTees={tees}
            puttingHandicap={15}
          />
          <div className="GitHubLogo">
            <GitHubLink />
          </div>
          <div className="TeeSelector">
            <TeeSelector
              tees={chibaShimin.tees}
              currentSelection={tees}
              onSelect={setTees}
            />
          </div>
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
