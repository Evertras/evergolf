import React, { Key } from 'react';
import { Container, Stage, Text } from '@pixi/react';
import { TextStyle } from 'pixi.js';

import { scaledByPixels, yardsBetween } from 'lib/coords';
import { hitShotWithParameters } from 'lib/shots/hit';

import Circle from 'components/drawing/Circle';
import ShotTracer from 'components/drawing/ShotTracer';
import YardageMeasurement from 'components/drawing/YardageMeasurement';

import styles from './ShotEditorDispersionView.module.css';
import Line from 'components/drawing/Line';

export interface ShotEditorDispersionViewProps {
  shot: Shot;
}

const ShotEditorDispersionView = ({ shot }: ShotEditorDispersionViewProps) => {
  const widthPixels = 1000;
  const heightPixels = 600;
  const startYardage = 50;

  // For now, just the main outcome
  const outcome = shot.potentialOutcomes[0];

  const maxYardageVisible = outcome.carryYardsMax + startYardage * 2;

  const pixelsPerYard = widthPixels / maxYardageVisible;
  const heightYards = heightPixels / pixelsPerYard;

  const originYards = {
    xYards: 50,
    yYards: heightYards / 2,
  };

  const originPixels = scaledByPixels(originYards, pixelsPerYard);

  const avgStartDegrees =
    (outcome.startDegreesLeftmost + outcome.startDegreesRightmost) / 2;
  const avgSidespinDegrees =
    (outcome.sidespinDegreeLeftmost + outcome.sidespinDegreeRightmost) / 2;
  const avgCarry = (outcome.carryYardsMin + outcome.carryYardsMax) / 2;

  const avgShot = hitShotWithParameters(
    originYards,
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
    originYards,
    outcome.startDegreesLeftmost,
    outcome.startDegreesLeftmost + outcome.sidespinDegreeLeftmost,
    maxLeftOffDegrees,
    outcome.carryYardsMax
  );

  const minLeftShot = hitShotWithParameters(
    originYards,
    outcome.startDegreesLeftmost,
    outcome.startDegreesLeftmost + outcome.sidespinDegreeLeftmost,
    maxLeftOffDegrees,
    outcome.carryYardsMin
  );

  const maxRightShot = hitShotWithParameters(
    originYards,
    outcome.startDegreesRightmost,
    outcome.startDegreesRightmost + outcome.sidespinDegreeRightmost,
    maxRightOffDegrees,
    outcome.carryYardsMax
  );

  const minRightShot = hitShotWithParameters(
    originYards,
    outcome.startDegreesRightmost,
    outcome.startDegreesRightmost + outcome.sidespinDegreeRightmost,
    maxRightOffDegrees,
    outcome.carryYardsMin
  );

  const maxStraightShot = hitShotWithParameters(
    originYards,
    avgStartDegrees,
    avgStartDegrees + avgSidespinDegrees,
    0,
    outcome.carryYardsMax
  );

  const minStraightShot = hitShotWithParameters(
    originYards,
    avgStartDegrees,
    avgStartDegrees + avgSidespinDegrees,
    0,
    outcome.carryYardsMin
  );

  const sideShots = [maxLeftShot, minLeftShot, maxRightShot, minRightShot];

  const straightShots = [minStraightShot, maxStraightShot];

  const furthestSideShotLocationXYards: number =
    maxStraightShot.landingSpot.xYards + 10;

  const horizontalDispersionTop: Coords = {
    xYards: furthestSideShotLocationXYards,
    yYards: maxLeftShot.landingSpot.yYards,
  };

  const horizontalDispersionBottom: Coords = {
    xYards: furthestSideShotLocationXYards,
    yYards: maxRightShot.landingSpot.yYards,
  };

  const horizontalDispersionColor = 'cyan';

  const displayShot = (key: Key, result: ShotResult, showDistance: boolean) => (
    <React.Fragment key={key}>
      <ShotTracer
        result={result}
        showDistance={showDistance}
        pixelsPerYard={pixelsPerYard}
        destinationText={
          showDistance
            ? undefined
            : yardsBetween(originYards, result.landingSpot).toFixed(0)
        }
      />
      <Circle
        loc={scaledByPixels(result.landingSpot, pixelsPerYard)}
        radiusPixels={3}
        fillColor="orange"
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Stage
        className={styles.stage}
        width={widthPixels}
        height={heightPixels}
        options={{
          background: 'darkolivegreen',
        }}
      >
        <Container interactiveChildren={false}>
          <Circle loc={originPixels} radiusPixels={5} fillColor="orange" />

          {straightShots.map((s, i) => displayShot(i, s, false))}

          <YardageMeasurement
            start={horizontalDispersionTop}
            end={horizontalDispersionBottom}
            pixelsPerYard={pixelsPerYard}
            color={horizontalDispersionColor}
            textColor={horizontalDispersionColor}
            thickness={1}
            showRings={false}
          />

          <Line
            start={scaledByPixels(maxLeftShot.landingSpot, pixelsPerYard)}
            end={scaledByPixels(horizontalDispersionTop, pixelsPerYard)}
            color={horizontalDispersionColor}
            thickness={1}
          />

          <Line
            start={scaledByPixels(maxRightShot.landingSpot, pixelsPerYard)}
            end={scaledByPixels(horizontalDispersionBottom, pixelsPerYard)}
            color={horizontalDispersionColor}
            thickness={1}
          />

          {sideShots.map((s, i) => displayShot(i, s, false))}

          {displayShot(-1, avgShot, true)}

          <Text
            text={shot.name}
            anchor={[0.5, 1]}
            x={originPixels.xPixels}
            y={originPixels.yPixels - 5}
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

export default ShotEditorDispersionView;
