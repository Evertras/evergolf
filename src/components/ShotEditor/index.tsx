import React, { useState } from 'react';

import ShotEditorDispersionView from 'components/ShotEditorDispersionView';
import Slider from 'components/Slider';

export interface ShotEditorProps {
  shot: Shot;
}

const ShotEditor = ({ shot }: ShotEditorProps) => {
  const [editedOutcome, setEditedOutcome] = useState(shot.potentialOutcomes[0]);

  return (
    <React.Fragment>
      <div>Carry</div>
      <div>
        Min {editedOutcome.carryYardsMin}
        <Slider
          min={0}
          max={editedOutcome.carryYardsMax}
          startingValue={editedOutcome.carryYardsMin}
          onChange={(val: number) => {
            setEditedOutcome({ ...editedOutcome, carryYardsMin: val });
          }}
        />
      </div>
      <div>
        Max {editedOutcome.carryYardsMax}
        <Slider
          min={editedOutcome.carryYardsMin}
          max={350}
          startingValue={editedOutcome.carryYardsMin}
          onChange={(val: number) => {
            setEditedOutcome({ ...editedOutcome, carryYardsMax: val });
          }}
        />
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
