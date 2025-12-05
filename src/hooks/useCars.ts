import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosClient } from '../api/axiosClient';
import { Car } from '../types';

const CARS_QUERY_KEY = ['cars'];

async function fetchCars(): Promise<Car[]> {
  const res = await axiosClient.get<Car[]>('/cars');
  return res.data;
}

async function createCar(car: Car): Promise<Car> {
  const res = await axiosClient.post<Car>('/cars', car);
  return res.data;
}

async function updateCar(car: Car): Promise<Car> {
  if (!car.id) {
    throw new Error('Car id is required');
  }
  const res = await axiosClient.put<Car>(`/cars/${car.id}`, car);
  return res.data;
}

async function deleteCar(id: number): Promise<void> {
  await axiosClient.delete(`/cars/${id}`);
}

export function useCars() {
  const queryClient = useQueryClient();

  const carsQuery = useQuery({
    queryKey: CARS_QUERY_KEY,
    queryFn: fetchCars,
  });

  const createMutation = useMutation({
    mutationFn: createCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEY });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEY });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CARS_QUERY_KEY });
    },
  });

  return {
    carsQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

