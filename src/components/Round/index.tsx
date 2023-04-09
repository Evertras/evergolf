import React, { useState } from 'react';
//import styles from './Round.module.css';

import HoleView from 'components/HoleView';
import Scorecard from 'components/Scorecard';
import ShotSelector from 'components/ShotSelector';

import { approachShot, putt } from 'lib/shots';
import { feetBetween, yardsBetween } from 'lib/coords';
import { isTerrainHittableFrom, Terrain, terrainAtPoint } from 'lib/terrain';
import { hitShotTowards } from 'lib/shots/hit';

export interface RoundProps {
  bag: Shot[];
  course: CourseData;
  selectedTees: Tees;
  puttingHandicap: number;
  pinLocationIndex: number;
}

const Round = ({
  bag,
  course,
  selectedTees,
  pinLocationIndex,
  puttingHandicap,
}: RoundProps) => {
  const [currentHoleNumber, setCurrentHoleNumber] = useState(1);

  const [shotHistoryByHole, setShotHistoryByHole] = useState(
    Array.from({ length: course.holes.length }, (): ShotHistory[] => [])
  );

  const [selectedShotIndex, setSelectedShotIndex] = useState<number>(0);

  const currentHoleData = course.holes[currentHoleNumber - 1];
  const teeLocation = currentHoleData.teeLocations[selectedTees.name];
  const pinLocation = currentHoleData.pinLocations[pinLocationIndex];

  const goForward = () => {
    if (currentHoleNumber === course.holes.length) {
      setCurrentHoleNumber(1);
    } else {
      setCurrentHoleNumber(currentHoleNumber + 1);
    }
  };

  const shotsTaken = shotHistoryByHole[currentHoleNumber - 1];

  const selectedShot = bag[selectedShotIndex];
  const expectedOutcome = selectedShot.potentialOutcomes[0];

  const imgScale = 1 / currentHoleData.imgPixelsPerYard;

  const holeComplete =
    shotsTaken &&
    shotsTaken.length > 0 &&
    shotsTaken[shotsTaken.length - 1].terrainTo === Terrain.Hole;

  const helpText = holeComplete
    ? 'Hole complete, click to continue!'
    : `Hitting ${selectedShot.name} (${expectedOutcome.carryYardsMin} - ${expectedOutcome.carryYardsMax} yd)`;

  const takeShot = (shot: ShotHistory) => {
    const copied = [...shotHistoryByHole];
    copied[currentHoleNumber - 1].push(shot);
    setShotHistoryByHole(copied);
  };

  const hittableShots = shotsTaken.filter((s) =>
    isTerrainHittableFrom(s.terrainTo)
  );

  const ballLocation: Coords =
    hittableShots.length > 0
      ? hittableShots[hittableShots.length - 1].result.landingSpot
      : teeLocation;

  const onClickHole = (target: Coords) => {
    // We can only hit if we're still playing the hole
    if (holeComplete) {
      goForward();
      return;
    }

    const result = hitShotTowards(bag[selectedShotIndex], ballLocation, target);

    let terrainFrom =
      hittableShots.length > 0
        ? hittableShots[hittableShots.length - 1].terrainTo
        : Terrain.Fairway;
    let terrainTo = terrainAtPoint(result.landingSpot, imgScale);
    const strokes = terrainTo === Terrain.OutOfBounds ? 2 : 1;

    takeShot({
      result,
      strokes,
      terrainFrom,
      terrainTo,
    });

    // TODO: Figure out better from bag, or redo this when we tackle short game
    const minDistance = 80;

    // Auto approach (with a short circuit safety valve to avoid infinite)
    let approachAttempts = 0;
    let approachFrom = result.landingSpot;
    let location = result.landingSpot;

    while (
      terrainTo !== Terrain.Green &&
      yardsBetween(result.landingSpot, pinLocation) < minDistance &&
      approachAttempts < 10
    ) {
      approachAttempts++;

      // TODO: use separate short game handicap for approximating
      const approachResult = approachShot(
        approachFrom,
        pinLocation,
        puttingHandicap
      );
      terrainFrom = terrainAtPoint(location, imgScale);
      terrainTo = terrainAtPoint(approachResult.landingSpot, imgScale);
      location = approachResult.landingSpot;
      approachFrom = location;

      takeShot({
        result: approachResult,
        strokes: 1,
        terrainFrom,
        terrainTo,
      });
    }

    if (terrainTo === Terrain.Green) {
      // Auto putt out
      const putts = putt(
        feetBetween(result.landingSpot, pinLocation),
        puttingHandicap
      );

      takeShot({
        result,
        strokes: putts,
        terrainFrom: Terrain.Green,
        terrainTo: Terrain.Hole,
      });
    }
  };

  return (
    <React.Fragment>
      <h2>
        {course.name} #{currentHoleNumber} (Par {currentHoleData.par})
      </h2>
      <ShotSelector
        shots={bag}
        onSelectIndex={setSelectedShotIndex}
        currentSelectedIndex={selectedShotIndex}
      />
      <div>{helpText}</div>
      <HoleView
        bag={bag}
        data={currentHoleData}
        shotsTaken={shotHistoryByHole[currentHoleNumber - 1]}
        onClick={onClickHole}
        tees={selectedTees}
        pinLocationIndex={pinLocationIndex}
        ballLocation={ballLocation}
      />
      <Scorecard
        course={course}
        activeHole={currentHoleNumber}
        shotsTaken={shotHistoryByHole}
        onClickHole={setCurrentHoleNumber}
      />
    </React.Fragment>
  );
};

export default Round;
