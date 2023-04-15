import React, { useState } from 'react';
import { basicBag } from 'lib/shots/basic-bag';

import ShotEditor from 'components/ShotEditor';
import ShotSelector from 'components/ShotSelector';

const BagEditor = () => {
  const [currentShotIndex, setCurrentShotIndex] = useState(0);

  const onSelectIndex = (i: number) => {
    setCurrentShotIndex(i);
  };

  const shot = basicBag[currentShotIndex];

  return (
    <React.Fragment>
      <ShotEditor key={shot.name} shot={shot} />
      <ShotSelector
        currentSelectedIndex={currentShotIndex}
        onSelectIndex={onSelectIndex}
        shots={basicBag}
      />
    </React.Fragment>
  );
};

export default BagEditor;
