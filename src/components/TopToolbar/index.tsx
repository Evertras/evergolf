import React from 'react';
import styles from './TopToolbar.module.css';

const TopToolbar = () => {
  const choices = [
    {
      name: 'Play',
      link: 'play',
    },
    {
      name: 'My Bag',
      link: 'bag',
    },
    {
      name: 'About',
      link: 'about',
    },
  ];

  return (
    <React.Fragment>
      <nav className={styles.TopToolbar}>
        <ul>
          {choices.map((c) => (
            <li className={styles.unselected}>
              <div>{c.name}</div>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default TopToolbar;
