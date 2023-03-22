import React from 'react';
import { render, screen } from '@testing-library/react';
import Hole from '.';

test('renders the hole image', () => {
  render(<Hole imgSrc="idk.jpg" />);
  const img = screen.getByAltText('idk.jpg');
  expect(img).toBeInTheDocument();
});
