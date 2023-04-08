import React from 'react';
import { ReactComponent as Hole1 } from 'data/course/chiba-shimin/terrain/1.svg';
import { ReactComponent as Hole2 } from 'data/course/chiba-shimin/terrain/2.svg';
import { ReactComponent as Hole3 } from 'data/course/chiba-shimin/terrain/3.svg';
import { ReactComponent as Hole4 } from 'data/course/chiba-shimin/terrain/4.svg';
import { ReactComponent as Hole5 } from 'data/course/chiba-shimin/terrain/5.svg';
import { ReactComponent as Hole6 } from 'data/course/chiba-shimin/terrain/6.svg';
import { ReactComponent as Hole7 } from 'data/course/chiba-shimin/terrain/7.svg';
import { ReactComponent as Hole8 } from 'data/course/chiba-shimin/terrain/8.svg';
import { terrainSVGID } from 'lib/terrain';

// Potentially interesting: https://ryanhutzley.medium.com/dynamic-svg-imports-in-create-react-app-d6d411f6d6c6

// For now, hardcode to chiba-shimin and figure out how to deal with real
// dynamic stuff later
export interface TerrainSVGProps {
  holeNumber: number;
}

const sources = [Hole1, Hole2, Hole3, Hole4, Hole5, Hole6, Hole7, Hole8];

const TerrainSVG = ({ holeNumber }: TerrainSVGProps) => {
  const Component = sources[holeNumber - 1];

  return (
    <React.Fragment>
      <Component
        id={terrainSVGID}
        height={100}
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
      />
    </React.Fragment>
  );
};

export default TerrainSVG;
