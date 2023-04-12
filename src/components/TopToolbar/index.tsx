import React from 'react';
import styles from './TopToolbar.module.css';

const TopToolbar = () => {
  return (
    <React.Fragment>
      <div className={styles.TopToolbar}>
        <div className={styles.selected}>Play</div>
        <div className={styles.unselected}>My Bag</div>
        <div className={styles.unselected}>About</div>
      </div>
    </React.Fragment>
  );
};

export default TopToolbar;
