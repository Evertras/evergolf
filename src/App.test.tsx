import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the hole', () => {
  render(<App />);
  const linkElement = screen.getByAltText(/chiba-shimin/i);
  expect(linkElement).toBeInTheDocument();
});
