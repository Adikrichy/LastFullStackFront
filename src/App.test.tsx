import { render, screen } from '@testing-library/react';
import { AuthProvider } from './contexts/AuthContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { describe, it, expect } from 'vitest';

describe('App - Authentication', () => {
  it('renders login page when not authenticated', () => {
    render(
      <AuthProvider>
        <MemoryRouter initialEntries={['/login']}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MemoryRouter>
      </AuthProvider>
    );
    
    expect(screen.getByText(/добро пожаловать/i)).toBeInTheDocument();
    expect(screen.getByText(/войдите в свой аккаунт/i)).toBeInTheDocument();
  });
});
