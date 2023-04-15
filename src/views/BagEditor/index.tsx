import React, { useState } from 'react';
import { basicBag } from 'lib/shots/basic-bag';

import ShotEditor from 'components/ShotEditor';
import ShotSelector from 'components/ShotSelector';

const BagEditor = () => {
  const [currentShotIndex, setCurrentShotIndex] = useState(0);

  const onSelectIndex = (i: number) => {
    setCurrentShotIndex(i);
  };

  const shot = basicBag.shots[currentShotIndex];

  return (
    <React.Fragment>
      <div>Approach game handicap: {basicBag.approachHandicap}</div>
      <div>Putting handicap: {basicBag.puttingHandicap}</div>
      <ShotEditor key={shot.name} shot={shot} />
      <ShotSelector
        currentSelectedIndex={currentShotIndex}
        onSelectIndex={onSelectIndex}
        shots={basicBag.shots}
      />
    </React.Fragment>
  );
};

export default BagEditor;
