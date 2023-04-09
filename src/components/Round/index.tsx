import React, { useState } from 'react';
import styles from './Round.module.css';

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

  const takeShots = (shots: ShotHistory[]) => {
    if (shots.length === 0) return;

    const copied = [...shotHistoryByHole];
    copied[currentHoleNumber - 1].push(...shots);
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

    const shotsTaken: ShotHistory[] = [];

    let terrainFrom =
      hittableShots.length > 0
        ? hittableShots[hittableShots.length - 1].terrainTo
        : Terrain.Fairway;

    const initialResult = hitShotTowards(
      bag[selectedShotIndex],
      ballLocation,
      terrainFrom,
      target
    );

    let terrainTo = terrainAtPoint(initialResult.landingSpot, imgScale);
    const strokes =
      terrainTo === Terrain.OutOfBounds || terrainTo === Terrain.Water ? 2 : 1;

    shotsTaken.push({
      result: initialResult,
      strokes,
      terrainFrom,
      terrainTo,
    });

    // TODO: Figure out better from bag, or redo this when we tackle short game
    const minDistance = 80;

    // Auto approach (with a short circuit safety valve to avoid infinite)
    let approachAttempts = 0;
    let approachFrom = initialResult.landingSpot;
    let location = initialResult.landingSpot;

    while (
      terrainTo !== Terrain.Green &&
      isTerrainHittableFrom(terrainTo) &&
      yardsBetween(initialResult.landingSpot, pinLocation) < minDistance &&
      approachAttempts < 10
    ) {
      approachAttempts++;

      terrainFrom = terrainAtPoint(location, imgScale);

      // TODO: use separate short game handicap for approximating
      const approachResult = approachShot(
        approachFrom,
        pinLocation,
        terrainFrom,
        puttingHandicap
      );

      terrainTo = terrainAtPoint(approachResult.landingSpot, imgScale);
      location = approachResult.landingSpot;
      approachFrom = location;

      shotsTaken.push({
        result: approachResult,
        strokes: 1,
        terrainFrom,
        terrainTo,
      });
    }

    if (terrainTo === Terrain.Green) {
      const lastShot = shotsTaken[shotsTaken.length - 1];
      // Auto putt out
      const putts = putt(
        feetBetween(lastShot.result.landingSpot, pinLocation),
        puttingHandicap
      );

      shotsTaken.push({
        result: lastShot.result,
        strokes: putts,
        terrainFrom: Terrain.Green,
        terrainTo: Terrain.Hole,
      });
    }

    takeShots(shotsTaken);
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
      <div className={styles.scorecard}>
        <Scorecard
          course={course}
          activeHole={currentHoleNumber}
          shotsTaken={shotHistoryByHole}
          onClickHole={setCurrentHoleNumber}
        />
      </div>
    </React.Fragment>
  );
};

export default Round;
