import React from 'react';
import { render, screen } from '@testing-library/react';
import RankingBar from './RankingBar';

test('renders learn react link', () => {
  render(<RankingBar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});