import React, { useState } from 'react';

import ShotEditorDispersionView from 'components/ShotEditorDispersionView';
import Slider from 'components/Slider';

import styles from './ShotEditor.module.css';

export interface ShotEditorProps {
  shot: Shot;
}

const ShotEditor = ({ shot }: ShotEditorProps) => {
  const [editedOutcome, setEditedOutcome] = useState(shot.potentialOutcomes[0]);

  const maxDegreeDispersion = 20;
  const leftmostDegrees = -maxDegreeDispersion;
  const rightmostDegrees = maxDegreeDispersion;
  const degreesStep = 0.5;

  const maxDistance = 350;

  return (
    <React.Fragment>
      <div className={styles.controls}>
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupHeader}>Carry</div>
          <div className={styles.controlGroupItem}>
            <div>Min {editedOutcome.carryYardsMin} yards</div>
            <Slider
              min={0}
              max={editedOutcome.carryYardsMax}
              startingValue={editedOutcome.carryYardsMin}
              onChange={(val: number) => {
                setEditedOutcome({ ...editedOutcome, carryYardsMin: val });
              }}
            />
            <div>Max {editedOutcome.carryYardsMax} yards</div>
            <Slider
              min={editedOutcome.carryYardsMin}
              max={maxDistance}
              startingValue={editedOutcome.carryYardsMax}
              onChange={(val: number) => {
                setEditedOutcome({ ...editedOutcome, carryYardsMax: val });
              }}
            />
          </div>
        </div>
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupHeader}>Start Direction</div>
          <div className={styles.controlGroupItem}>
            <div>Leftmost {editedOutcome.startDegreesLeftmost.toFixed(1)}°</div>
            <Slider
              min={leftmostDegrees}
              max={editedOutcome.startDegreesRightmost}
              step={degreesStep}
              startingValue={editedOutcome.startDegreesLeftmost}
              onChange={(val: number) => {
                setEditedOutcome({
                  ...editedOutcome,
                  startDegreesLeftmost: val,
                });
              }}
            />
            <div>Rightmost {editedOutcome.startDegreesRightmost}°</div>
            <Slider
              min={editedOutcome.startDegreesLeftmost}
              max={rightmostDegrees}
              step={degreesStep}
              startingValue={editedOutcome.startDegreesRightmost}
              onChange={(val: number) => {
                setEditedOutcome({
                  ...editedOutcome,
                  startDegreesRightmost: val,
                });
              }}
            />
          </div>
        </div>
        <div className={styles.controlGroup}>
          <div className={styles.controlGroupHeader}>Spin Direction</div>
          <div className={styles.controlGroupItem}>
            <div>
              Leftmost {editedOutcome.sidespinDegreeLeftmost.toFixed(1)}°
            </div>
            <Slider
              min={leftmostDegrees}
              max={editedOutcome.sidespinDegreeRightmost}
              step={degreesStep}
              startingValue={editedOutcome.sidespinDegreeLeftmost}
              onChange={(val: number) => {
                setEditedOutcome({
                  ...editedOutcome,
                  sidespinDegreeLeftmost: val,
                });
              }}
            />
            <div>Rightmost {editedOutcome.sidespinDegreeRightmost}°</div>
            <Slider
              min={editedOutcome.sidespinDegreeLeftmost}
              max={rightmostDegrees}
              step={degreesStep}
              startingValue={editedOutcome.sidespinDegreeRightmost}
              onChange={(val: number) => {
                setEditedOutcome({
                  ...editedOutcome,
                  sidespinDegreeRightmost: val,
                });
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
