import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation menu', () => {
  render(<App />);
  const navElement = screen.getByText(/search/i); // Verificăm dacă bara de navigare conține "Search"
  expect(navElement).toBeInTheDocument();
});

test('renders default route', () => {
  render(<App />);
  const searchBox = screen.getByPlaceholderText(/nume lucrare/i); // Verificăm dacă inputul de căutare este afișat
  expect(searchBox).toBeInTheDocument();
});
