import React from 'react';
//import logo from "./logo.svg";
import './App.css';
import Hole from './components/Hole';

//<img src={logo} className="App-logo" alt="logo" />
function App() {
  return (
    <React.Fragment>
      <div className="App">
        <header className="App-header">
          <Hole imgSrc="course/chiba-shimin/holes/1.png" />
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
