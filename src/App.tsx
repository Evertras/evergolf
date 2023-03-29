import React from 'react';
import './App.css';
import Hole from 'components/Hole';
import GitHubLink from 'components/GitHubLink';
import chibaShimin from 'data/course/chiba-shimin/course.json';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <div className="GitHubLogo">
            <GitHubLink />
          </div>
          <Hole data={chibaShimin.holes[0]} />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
