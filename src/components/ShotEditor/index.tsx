import React from 'react';
import { Container, Stage, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { yardsBetween } from 'lib/coords';
import { hitShotWithParameters } from 'lib/shots/hit';

import Circle from 'components/drawing/Circle';
import ShotTracer from 'components/drawing/ShotTracer';
import YardageMeasurement from 'components/drawing/YardageMeasurement';

import styles from './ShotEditor.module.css';

export interface ShotEditorProps {
  shot: Shot;
}

const ShotEditor = ({ shot }: ShotEditorProps) => {
  const widthPixels = 1000;
  const heightPixels = 600;
  const startYardage = 50;

  // For now, just the main outcome
  const outcome = shot.potentialOutcomes[0];

  const maxYardageVisible = outcome.carryYardsMax + startYardage * 2;

  const pixelsPerYard = widthPixels / maxYardageVisible;
  const heightYards = heightPixels / pixelsPerYard;

  const origin = {
    xYards: 50,
    yYards: heightYards / 2,
  };

  const avgStartDegrees =
    (outcome.startDegreesLeftmost + outcome.startDegreesRightmost) / 2;
  const avgSidespinDegrees =
    (outcome.sidespinDegreeLeftmost + outcome.sidespinDegreeRightmost) / 2;
  const avgCarry = (outcome.carryYardsMin + outcome.carryYardsMax) / 2;

  const avgShot = hitShotWithParameters(
    origin,
    avgStartDegrees,
    avgStartDegrees + avgSidespinDegrees,
    0,
    avgCarry
  );

  const maxLeftOffDegrees =
    outcome.startDegreesLeftmost -
    avgStartDegrees +
    (outcome.sidespinDegreeLeftmost - avgSidespinDegrees);
  const maxRightOffDegrees =
    outcome.startDegreesRightmost -
    avgStartDegrees +
    (outcome.sidespinDegreeRightmost - avgSidespinDegrees);

  const maxLeftShot = hitShotWithParameters(
    origin,
    outcome.startDegreesLeftmost,
    outcome.startDegreesLeftmost + outcome.sidespinDegreeLeftmost,
    maxLeftOffDegrees,
    outcome.carryYardsMax
  );

  const minLeftShot = hitShotWithParameters(
    origin,
    outcome.startDegreesLeftmost,
    outcome.startDegreesLeftmost + outcome.sidespinDegreeLeftmost,
    maxLeftOffDegrees,
    outcome.carryYardsMin
  );

  const maxRightShot = hitShotWithParameters(
    origin,
    outcome.startDegreesRightmost,
    outcome.startDegreesRightmost + outcome.sidespinDegreeRightmost,
    maxRightOffDegrees,
    outcome.carryYardsMax
  );

  const minRightShot = hitShotWithParameters(
    origin,
    outcome.startDegreesRightmost,
    outcome.startDegreesRightmost + outcome.sidespinDegreeRightmost,
    maxRightOffDegrees,
    outcome.carryYardsMin
  );

  const maxStraightShot = hitShotWithParameters(
    origin,
    avgStartDegrees,
    avgStartDegrees + avgSidespinDegrees,
    0,
    outcome.carryYardsMax
  );

  const minStraightShot = hitShotWithParameters(
    origin,
    avgStartDegrees,
    avgStartDegrees + avgSidespinDegrees,
    0,
    outcome.carryYardsMin
  );

  const sideShots = [maxLeftShot, minLeftShot, maxRightShot, minRightShot];

  const straightShots = [minStraightShot, maxStraightShot];

  const displayShot = (result: ShotResult, showDistance: boolean) => (
    <React.Fragment>
      <ShotTracer
        result={result}
        showDistance={showDistance}
        destinationText={
          showDistance
            ? undefined
            : yardsBetween(origin, result.landingSpot).toFixed(0)
        }
      />
      <Circle loc={result.landingSpot} radiusPixels={3} fillColor="orange" />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Stage
        className={styles.stage}
        width={widthPixels}
        height={heightPixels}
        options={{
          backgroundColor: 'darkolivegreen',
        }}
      >
        <Container interactiveChildren={false} scale={pixelsPerYard}>
          <Circle loc={origin} radiusPixels={5} fillColor="orange" />

          {straightShots.map((s) => displayShot(s, false))}

          <YardageMeasurement
            start={maxRightShot.landingSpot}
            end={maxLeftShot.landingSpot}
            color="cyan"
            textColor="cyan"
            thickness={1}
            showRings={false}
          />

          {sideShots.map((s) => displayShot(s, false))}

          {displayShot(avgShot, true)}

          <Text
            text={shot.name}
            anchor={[0.5, 1]}
            x={origin.xYards}
            y={origin.yYards - 5}
            style={
              new TextStyle({
                fill: 'white',
                stroke: 'black',
                strokeThickness: 2,
                fontSize: '15pt',
              })
            }
          />
        </Container>
      </Stage>
    </React.Fragment>
  );
};

export default ShotEditor;
