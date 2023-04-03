import React from 'react';
import './ShotSelector.css';

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
      <ul className="ShotSelector">
        {shots.map((s, i) => (
          <li
            key={i}
            className={currentSelectedIndex === i ? 'current' : 'unselected'}
            onMouseDown={() => onSelectIndex(i)}
          >
            {s.name}
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ShotSelector;
