import React, { useState } from 'react';

import ShotEditorDispersionView from 'components/ShotEditorDispersionView';
import Slider from 'components/Slider';

import styles from './ShotEditor.module.css';

export interface ShotEditorProps {
  shot: Shot;
}

const ShotEditor = ({ shot }: ShotEditorProps) => {
  const [editedOutcome, setEditedOutcome] = useState(shot.potentialOutcomes[0]);

  return (
    <React.Fragment>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupHeader}>Carry</div>
          <div className={styles.controlGroupItem}>
            <div>Min {editedOutcome.carryYardsMin}</div>
            <Slider
              min={0}
              max={editedOutcome.carryYardsMax}
              startingValue={editedOutcome.carryYardsMin}
              onChange={(val: number) => {
                setEditedOutcome({ ...editedOutcome, carryYardsMin: val });
              }}
            />
            <div>Max {editedOutcome.carryYardsMax}</div>
            <Slider
              min={editedOutcome.carryYardsMin}
              max={350}
              startingValue={editedOutcome.carryYardsMax}
              onChange={(val: number) => {
                setEditedOutcome({ ...editedOutcome, carryYardsMax: val });
              }}
            />
          </div>
        </div>
      </div>
      <ShotEditorDispersionView
        shot={{
          name: shot.name,
          potentialOutcomes: [editedOutcome],
        }}
      />
    </React.Fragment>
  );
};

export default ShotEditor;
