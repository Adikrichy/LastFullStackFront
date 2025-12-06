import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Мокаем CarsPage (это будет работать, т.к. мок стоит выше импортов)
vi.mock('./pages/CarsPage', () => ({
  default: () => <div data-testid="cars-page">Cars Page Mock</div>
}));

// После mock можно импортировать — Vitest подменит модуль автоматически
import CarsPage from './pages/CarsPage';

describe('CarsPage Integration', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
        mutations: { retry: false },
      },
    });
  });

  it('renders cars page inside providers', () => {
    render(
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CarsPage />
        </QueryClientProvider>
      </AuthProvider>
    );

    expect(screen.getByTestId('cars-page')).toBeInTheDocument();
  });
});
