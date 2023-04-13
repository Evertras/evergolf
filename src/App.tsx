import React from 'react';

import GitHubLink from 'components/GitHubLink';

import styles from './App.module.css';
import TopToolbar from 'components/TopToolbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <React.Fragment>
      <div className={styles.App}>
        <TopToolbar />
        <Outlet />
        <div className={styles.GitHubLogo}>
          <GitHubLink />
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
