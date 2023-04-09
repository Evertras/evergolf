import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TeeSelector from '.';

const basicTees: Tees[] = [
  { name: 'red' },
  { name: 'white' },
  { name: 'blue' },
];

const nullSelector = () => {};

test('shows all tees', () => {
  render(
    <TeeSelector
      tees={basicTees}
      currentSelection={basicTees[0]}
      onSelect={nullSelector}
    />
  );

  basicTees.map(({ name }) => {
    expect(screen.getByText(name)).toBeInTheDocument();
  });
});

test('selects tees on click', () => {
  let selected: Tees = basicTees[0];

  const onSelect = (tee: Tees) => {
    selected = tee;
  };

  render(
    <TeeSelector
      tees={basicTees}
      currentSelection={selected}
      onSelect={onSelect}
    />
  );

  // sanity check
  expect(selected.name).not.toEqual('blue');

  userEvent.click(screen.getByText('blue'));
  expect(selected.name).toEqual('blue');
});
