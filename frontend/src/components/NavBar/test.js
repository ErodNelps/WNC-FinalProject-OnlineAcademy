import { render, screen } from '@testing-library/react';
import App from '.';

test('renders learn react link', () => {
  render(<NavBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
