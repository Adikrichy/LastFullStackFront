import { Car } from '../types';

/**
 * Экспортирует массив автомобилей в CSV формат
 * @param cars - Массив автомобилей для экспорта
 * @param filename - Имя файла (по умолчанию: cars.csv)
 */
export const exportCarsToCSV = (cars: Car[], filename = 'cars.csv') => {
  // Определяем колонки CSV
  const headers = ['Brand', 'Model', 'Color', 'Registration Number', 'Year', 'Price'];
  
  // Преобразуем данные в строки CSV
  const csvContent = [
    headers.join(','),
    ...cars.map(car =>
      [
        `"${car.brand}"`,
        `"${car.model}"`,
        `"${car.color}"`,
        `"${car.registerNumber}"`,
        car.year,
        car.price,
      ].join(',')
    ),
  ].join('\n');

  // Создаем Blob и скачиваем файл
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
