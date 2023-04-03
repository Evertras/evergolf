import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ShotSelector from '.';

const shots: Shot[] = [
  {
    name: 'Driver',
    potentialOutcomes: [
      {
        carryYardsMin: 250,
        carryYardsMax: 280,
        startDegreesLeftmost: -2,
        startDegreesRightmost: 2,
        sidespinDegreeLeftmost: -4,
        sidespinDegreeRightmost: 4,
      },
    ],
  },
  {
    name: '5I',
    potentialOutcomes: [
      {
        carryYardsMin: 165,
        carryYardsMax: 175,
        startDegreesLeftmost: -2,
        startDegreesRightmost: 2,
        sidespinDegreeLeftmost: -2,
        sidespinDegreeRightmost: 2,
      },
    ],
  },
  {
    name: '8I',
    potentialOutcomes: [
      {
        carryYardsMin: 130,
        carryYardsMax: 135,
        startDegreesLeftmost: -2,
        startDegreesRightmost: 2,
        sidespinDegreeLeftmost: -2,
        sidespinDegreeRightmost: 2,
      },
    ],
  },
];

test('ShotSelector can click on different clubs', () => {
  const originalSelectedShotIndex = 1;
  let selectedIndex = 1;
  const onSelectIndex = (i: number) => {
    selectedIndex = i;
  };

  render(
    <ShotSelector
      shots={shots}
      currentSelectedIndex={originalSelectedShotIndex}
      onSelectIndex={onSelectIndex}
    />
  );

  expect(selectedIndex).toEqual(originalSelectedShotIndex);
  userEvent.click(screen.getByText(shots[0].name));
  expect(selectedIndex).toEqual(0);
  userEvent.click(screen.getByText(shots[2].name));
  expect(selectedIndex).toEqual(2);
});
