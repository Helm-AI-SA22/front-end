import React from 'react';
import { render, screen } from '@testing-library/react';
import PageFooter from './Footer';

test('renders learn react link', () => {
  render(<PageFooter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});