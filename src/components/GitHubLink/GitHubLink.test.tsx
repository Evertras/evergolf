import { render, screen } from '@testing-library/react';
import GitHubLink from '.';

test('link points to correct URL', () => {
  render(<GitHubLink />);

  const link = screen.getByRole('link');

  expect(link).toBeInTheDocument();
  expect(link).toHaveAttribute('href', 'https://github.com/Evertras/evergolf');
});
