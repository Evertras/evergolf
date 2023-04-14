import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './TopToolbar.module.css';

const TopToolbar = () => {
  const choices = [
    {
      name: 'Play',
      link: '/',
    },
    {
      name: 'My Bag',
      link: '/bag',
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
              <NavLink
                to={c.link}
                className={({ isActive, isPending }) =>
                  isActive ? styles.selected : styles.unselected
                }
              >
                {c.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default TopToolbar;
