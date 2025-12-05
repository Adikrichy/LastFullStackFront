import { render, screen } from '@testing-library/react';
import CarsPage from './pages/CarsPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

test('renders cars page with loading state', () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <CarsPage />
    </QueryClientProvider>
  );

  // Проверяем наличие элемента загрузки (progressbar)
  expect(screen.getByRole('progressbar')).toBeInTheDocument();
});
