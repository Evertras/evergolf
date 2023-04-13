import React from 'react';
import styles from './TopToolbar.module.css';

const TopToolbar = () => {
  const choices = [
    {
      name: 'Play',
      link: '/',
    },
    {
      name: 'About',
      link: '/about',
    },
  ];

  return (
    <React.Fragment>
      <nav className={styles.TopToolbar}>
        <ul>
          {choices.map((c) => (
            <li className={styles.unselected}>
              <a href={c.link}>{c.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default TopToolbar;
