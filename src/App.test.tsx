import { render, screen } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';

test('renders login page when not authenticated', () => {
  render(
    <AuthProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </AuthProvider>
  );
  
  // Когда пользователь не аутентифицирован, должна отображаться страница входа
  expect(screen.getByText(/добро пожаловать/i)).toBeInTheDocument();
  expect(screen.getByText(/войдите в свой аккаунт/i)).toBeInTheDocument();
});
