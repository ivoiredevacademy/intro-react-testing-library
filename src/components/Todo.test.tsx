import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import App from '../App';
import '@testing-library/jest-dom/vitest'


it('renders the app title', () => {
  render(<App />);
  expect(screen.getByText('To-Do App')).toBeInTheDocument();
});