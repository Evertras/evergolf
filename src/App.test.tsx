import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders a hole image', () => {
  render(<App />);
  const linkElement = screen.getByAltText(/hole/i);
  expect(linkElement).toBeInTheDocument();
});
