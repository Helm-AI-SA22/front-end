import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultList from './ResultsList';

test('renders learn react link', () => {
  //render(<ResultList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
