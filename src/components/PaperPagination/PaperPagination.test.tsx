import React from 'react';
import { render, screen } from '@testing-library/react';
import PaperPagination from './PaperPagination';

test('renders learn react link', () => {
  render(<PaperPagination />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
