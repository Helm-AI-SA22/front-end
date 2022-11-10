import React from 'react';
import { render, screen } from '@testing-library/react';
import RightPanel from './RightPanel';

test('renders learn react link', () => {
  render(<RightPanel />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
