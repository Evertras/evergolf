import React from 'react';
import styles from './TeeSelector.module.css';

export interface TeeSelectorProps {
  tees: Tees[];
  currentSelection: Tees;
  onSelect: (selected: Tees) => void;
}

const TeeSelector = ({
  tees,
  currentSelection,
  onSelect,
}: TeeSelectorProps) => {
  const isSelected = (t: Tees): boolean => {
    return t.name === currentSelection.name;
  };

  const getColors = (t: Tees): { foreground: string; background: string } => {
    const background = t.color ?? t.name;
    const foreground = background === 'white' ? 'black' : 'white';

    return {
      foreground,
      background,
    };
  };

  return (
    <React.Fragment>
      <div className={styles.TeeSelector}>
        <div>Tees</div>
        {tees.map((t, i) => {
          const { foreground, background } = getColors(t);

          return (
            <div
              key={i}
              className={styles.entry}
              onMouseDown={() => onSelect(t)}
              style={{
                color: foreground,
                backgroundColor: background,
                // TODO: Better visualization of selection
                textTransform: isSelected(t) ? 'uppercase' : 'capitalize',
              }}
            >
              {t.name}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default TeeSelector;
