import React from 'react';
import { render, screen } from '@testing-library/react';
import LeftPanel from './LeftPanel';

test('renders learn react link', () => {
  render(<LeftPanel />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
