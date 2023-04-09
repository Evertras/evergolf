import React from 'react';
import styles from './ShotSelector.module.css';

export interface ShotSelectorProps {
  shots: Shot[];
  currentSelectedIndex: number;
  onSelectIndex: (i: number) => void;
}

const ShotSelector = ({
  shots,
  currentSelectedIndex,
  onSelectIndex,
}: ShotSelectorProps) => {
  return (
    <React.Fragment>
      <ul className={styles.shotSelectorList}>
        {shots.map((s, i) => (
          <li
            key={i}
            className={
              currentSelectedIndex === i ? styles.current : styles.unselected
            }
            onMouseDown={() => onSelectIndex(i)}
          >
            {s.name}
            <span className={styles.yardage}>
              {' '}
              {Math.floor(
                (s.potentialOutcomes[0].carryYardsMax +
                  s.potentialOutcomes[0].carryYardsMin) /
                  2
              )}
              yd
            </span>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ShotSelector;
