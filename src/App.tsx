import React from 'react';
import './App.css';
import GitHubLink from 'components/GitHubLink';
import chibaShimin from 'data/course/chiba-shimin/course.json';
import { basicBag } from 'lib/shots/basic-bag';
import Round from 'components/Round';

function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <div className="GitHubLogo">
            <GitHubLink />
          </div>
          <Round bag={basicBag} course={chibaShimin} tees={'blue'} />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
