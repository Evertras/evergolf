import React from 'react';
import { ReactComponent as Hole1 } from 'data/course/chiba-shimin/terrain/1.svg';
import { ReactComponent as Hole2 } from 'data/course/chiba-shimin/terrain/2.svg';
import { terrainSVGID } from 'lib/terrain';

// Potentially interesting: https://ryanhutzley.medium.com/dynamic-svg-imports-in-create-react-app-d6d411f6d6c6

// For now, hardcode to chiba-shimin and figure out how to deal with real
// dynamic stuff later
export interface TerrainSVGProps {
  holeNumber: number;
}

const sources = [Hole1, Hole2];

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
