import React from 'react';
import { render, screen } from '@testing-library/react';
import Searchbar from './SearchBar';

test('renders learn react link', () => {
  render(<Searchbar />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
