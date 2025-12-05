# 📚 Объяснение кода проекта в контексте глав 7-12

Этот документ объясняет весь код проекта, связывая его с концепциями из глав 7-12.

---

## 🧩 ГЛАВА 7: Подготовка фронтенда (React + Vite + структура проекта)

### 1. Структура проекта

Твой проект следует стандартной структуре React + Vite:

```
src/
  main.tsx              // ✅ Входная точка (ГЛАВА 7, пункт 2)
  App.tsx               // ✅ Корневой компонент с роутингом (ГЛАВА 7, пункт 2)
  pages/                // ✅ Страницы приложения (ГЛАВА 7, пункт 2)
    CarsPage.tsx
    AboutPage.tsx
    NotFoundPage.tsx
  components/           // ✅ Переиспользуемые компоненты (ГЛАВА 7, пункт 2)
    CarFormDialog.tsx
    ConfirmDialog.tsx
  hooks/                // ✅ Кастомные хуки для работы с API (ГЛАВА 7, пункт 2)
    useCars.ts
  types.ts              // ✅ TypeScript типы (ГЛАВА 7, пункт 2)
  api/                  // ✅ Функции для запросов к backend (ГЛАВА 7, пункт 2)
    axiosClient.ts
```

### 2. main.tsx — входная точка (ГЛАВА 7, пункт 3)

```typescript
// main.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>                    {/* Роутинг для навигации */}
      <QueryClientProvider client={queryClient}>  {/* ГЛАВА 7: Настройка React Query */}
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
```

**Что здесь происходит:**
- `QueryClientProvider` — оборачивает всё приложение, чтобы можно было использовать `useQuery` и `useMutation` в любом компоненте (ГЛАВА 7, пункт 3)
- `BrowserRouter` — включает роутинг (переходы между страницами)
- `queryClient` — хранит кэш запросов и управляет их жизненным циклом

### 3. package.json — зависимости (ГЛАВА 7, пункт 3)

```json
{
  "dependencies": {
    "@mui/material": "^6.1.7",              // ✅ Material UI (ГЛАВА 7, пункт 3)
    "@tanstack/react-query": "^5.62.7",    // ✅ React Query (ГЛАВА 7, пункт 3)
    "axios": "^1.7.9",                     // ✅ HTTP клиент (ГЛАВА 10)
    "react-router-dom": "^7.0.2"           // ✅ Роутинг
  }
}
```

**Соответствие главе 7:**
- Material UI установлен ✅
- React Query установлен ✅
- Настроен QueryClientProvider в main.tsx ✅

### 4. Связь с backend (ГЛАВА 7, пункт 4)

```typescript
// api/axiosClient.ts
export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',  // ✅ Backend на порту 8080 (ГЛАВА 7, пункт 4)
  headers: {
    'Content-Type': 'application/json',
  },
});
```

**Что это значит:**
- Все запросы идут на `http://localhost:8080/api`
- Фронт работает на `http://localhost:5173` (Vite по умолчанию)
- Для работы нужна настройка CORS на backend (ГЛАВА 12, пункт 2)

---

## 🧩 ГЛАВА 8: Основы React (компоненты, состояние, списки, эффекты)

### 1. Функциональные компоненты (ГЛАВА 8, пункт 1)

**Пример из CarsPage.tsx:**

```typescript
export default function CarsPage() {  // ✅ Функциональный компонент
  // логика компонента
  return ( /* JSX */ );
}
```

**Это и есть функциональный компонент** — функция, которая возвращает JSX.

### 2. Props (ГЛАВА 8, пункт 2)

**Пример из CarFormDialog.tsx:**

```typescript
interface CarFormDialogProps {  // ✅ Типизация props (ГЛАВА 9)
  open: boolean;
  initialCar: Car | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (car: Car) => void;
}

export default function CarFormDialog({
  open,           // ✅ Props — входные данные компонента
  initialCar,
  loading,
  onClose,
  onSubmit,
}: CarFormDialogProps) {
  // ...
}
```

**Использование в CarsPage.tsx:**

```typescript
<CarFormDialog
  open={openForm}                    // ✅ Передаём props
  onClose={() => setOpenForm(false)}
  initialCar={editingCar}
  onSubmit={handleSubmit}
  loading={createMutation.isPending || updateMutation.isPending}
/>
```

**Смысл:**
- `CarFormDialog` получает данные через props
- Родительский компонент (`CarsPage`) управляет состоянием
- Дочерний компонент (`CarFormDialog`) только отображает UI и вызывает колбэки

### 3. useState — управление состоянием (ГЛАВА 8, пункт 3)

**Пример из CarsPage.tsx:**

```typescript
const [openForm, setOpenForm] = useState(false);           // ✅ Состояние диалога
const [editingCar, setEditingCar] = useState<Car | null>(null);  // ✅ Редактируемая машина
const [deleteTarget, setDeleteTarget] = useState<Car | null>(null); // ✅ Машина для удаления
```

**Как это работает:**
1. `useState(false)` создаёт состояние со значением `false`
2. `openForm` — текущее значение
3. `setOpenForm(true)` — изменяет значение и **перерисовывает компонент**

**Паттерн управления UI:**
```typescript
// Открыть диалог для создания
const handleAddClick = () => {
  setEditingCar(null);      // ✅ Очищаем редактируемую машину
  setOpenForm(true);        // ✅ Открываем диалог
};

// Открыть диалог для редактирования
const handleEditClick = (car: Car) => {
  setEditingCar(car);       // ✅ Устанавливаем машину для редактирования
  setOpenForm(true);        // ✅ Открываем диалог
};
```

### 4. Работа со списками: map (ГЛАВА 8, пункт 4)

**Пример из CarsPage.tsx:**

```typescript
const cars = carsQuery.data ?? [];  // ✅ Защита от undefined (ГЛАВА 8, пункт 4)

{cars.map((car, index) => (  // ✅ map для рендеринга списка
  <TableRow key={car.id ?? car.registerNumber}>
    <TableCell>{car.brand}</TableCell>
    <TableCell>{car.model}</TableCell>
    {/* ... */}
  </TableRow>
))}
```

**Важно:**
- `cars` **должен быть массивом**, иначе `cars.map is not a function`
- Поэтому используется `carsQuery.data ?? []` — если данных нет, берём пустой массив
- `key={car.id ?? car.registerNumber}` — уникальный ключ для React (обязательно!)

### 5. useEffect — сайд-эффекты (ГЛАВА 8, пункт 5)

**Пример из CarFormDialog.tsx:**

```typescript
useEffect(() => {
  if (initialCar) {
    setCar(initialCar);      // ✅ Заполняем форму данными машины
  } else {
    setCar(emptyCar);        // ✅ Очищаем форму для новой машины
  }
}, [initialCar, open]);     // ✅ Запускается при изменении initialCar или open
```

**Смысл:**
- Когда открывается диалог редактирования (`initialCar` не null) → заполняем форму
- Когда открывается диалог создания (`initialCar` null) → очищаем форму
- Зависимости `[initialCar, open]` — эффект запускается при их изменении

**Примечание:** React Query использует `useEffect` внутри себя, поэтому тебе не нужно вручную вызывать `fetchCars()` при монтировании компонента.

---

## 🧩 ГЛАВА 9: TypeScript в React (типы, интерфейсы, дженерики)

### 1. Интерфейсы для моделей (ГЛАВА 9, пункт 1)

**types.ts:**

```typescript
export interface Car {          // ✅ Интерфейс для машины (ГЛАВА 9, пункт 1)
  id?: number;                  // ✅ Опциональное поле (может быть undefined)
  brand: string;                // ✅ Обязательное поле
  model: string;
  color: string;
  registerNumber: string;
  year: number;
  price: number;
}

export interface Owner {       // ✅ Интерфейс для владельца
  id?: number;
  name: string;
  email: string;
  phone: string;
}
```

**Почему это важно:**
- TypeScript проверяет типы **до запуска** — если попытаешься `car.price.toFixed(2)`, а `price` может быть `null`, TS предупредит
- IDE подсказывает доступные поля при автодополнении
- Код становится самодокументированным

### 2. Типизация хуков (ГЛАВА 9, пункт 2)

**useState с типами:**

```typescript
const [editingCar, setEditingCar] = useState<Car | null>(null);
//                      ↑
//                      Тип состояния: Car или null
```

**useQuery с типами:**

```typescript
// hooks/useCars.ts
async function fetchCars(): Promise<Car[]> {  // ✅ Возвращает массив Car
  const res = await axiosClient.get<Car[]>('/cars');  // ✅ Типизация ответа
  return res.data;
}

const carsQuery = useQuery<Car[]>({  // ✅ Типизация данных запроса
  queryKey: ['cars'],
  queryFn: fetchCars,
});
```

**useMutation с типами:**

```typescript
async function createCar(car: Car): Promise<Car> {  // ✅ Входной и выходной типы
  const res = await axiosClient.post<Car>('/cars', car);
  return res.data;
}

const createMutation = useMutation({
  mutationFn: createCar,  // ✅ TypeScript знает, что createCar принимает Car
  // ...
});
```

### 3. Типы для props (ГЛАВА 9, пункт 3)

**CarFormDialog.tsx:**

```typescript
interface CarFormDialogProps {  // ✅ Типизация props (ГЛАВА 9, пункт 3)
  open: boolean;
  initialCar: Car | null;
  loading?: boolean;             // ✅ Опциональный prop
  onClose: () => void;           // ✅ Функция без параметров
  onSubmit: (car: Car) => void;  // ✅ Функция с параметром Car
}
```

**ConfirmDialog.tsx:**

```typescript
interface ConfirmDialogProps {
  open: boolean;
  title: string;
  content: string;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
```

**Преимущества:**
- Если передашь неправильный тип → ошибка компиляции
- IDE подсказывает доступные props
- Код понятен без чтения реализации

---

## 🧩 ГЛАВА 10: Работа с REST API (fetch/axios/React Query)

### 1. Axios клиент (ГЛАВА 10, пункт 2)

**api/axiosClient.ts:**

```typescript
export const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api',  // ✅ Базовый URL (ГЛАВА 10, пункт 2)
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Обработка ошибок (ГЛАВА 10)
axiosClient.interceptors.response.use(
  (response) => response,  // ✅ Успешный ответ — пропускаем
  (error: AxiosError) => {
    if (error.response) {
      // Сервер вернул ошибку (400, 500, etc.)
      const message = (error.response.data as { message?: string })?.message || error.message;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // Запрос отправлен, но ответа нет (сеть недоступна)
      return Promise.reject(new Error('Network error. Please check your connection.'));
    } else {
      // Ошибка при настройке запроса
      return Promise.reject(error);
    }
  }
);
```

**Что это даёт:**
- Все запросы автоматически идут на `/api/*`
- Единая обработка ошибок для всего приложения
- Не нужно каждый раз писать `baseURL` и headers

### 2. GET запрос — получение данных (ГЛАВА 10, пункт 3)

**hooks/useCars.ts:**

```typescript
async function fetchCars(): Promise<Car[]> {
  const res = await axiosClient.get<Car[]>('/cars');  // ✅ GET запрос (ГЛАВА 10, пункт 3)
  return res.data;
}
```

**Эквивалент на fetch:**
```typescript
async function fetchCars(): Promise<Car[]> {
  const res = await fetch('http://localhost:8080/api/cars');
  if (!res.ok) throw new Error('Failed to fetch cars');
  return res.json();
}
```

**Axios проще:**
- Автоматически парсит JSON
- Бросает ошибку при статусе 4xx/5xx
- Типизация ответа через дженерик `<Car[]>`

### 3. React Query: GET (ГЛАВА 10, пункт 3)

**hooks/useCars.ts:**

```typescript
const carsQuery = useQuery({  // ✅ React Query для GET (ГЛАВА 10, пункт 3)
  queryKey: ['cars'],         // ✅ Ключ кэша
  queryFn: fetchCars,         // ✅ Функция для получения данных
});
```

**Использование в CarsPage.tsx:**

```typescript
const { carsQuery } = useCars();

if (carsQuery.isLoading) {  // ✅ Состояние загрузки
  return <CircularProgress />;
}

if (carsQuery.isError) {    // ✅ Состояние ошибки
  return <Typography color="error">Error: {carsQuery.error.message}</Typography>;
}

const cars = carsQuery.data ?? [];  // ✅ Данные (или пустой массив)
```

**Что даёт React Query:**
- Автоматическое кэширование
- Повторные запросы при фокусе окна
- Состояния `isLoading`, `isError`, `data`
- Не нужно писать `useState` и `useEffect` для загрузки данных

### 4. POST запрос — создание (ГЛАВА 10, пункт 2)

**hooks/useCars.ts:**

```typescript
async function createCar(car: Car): Promise<Car> {
  const res = await axiosClient.post<Car>('/cars', car);  // ✅ POST запрос (ГЛАВА 10, пункт 2)
  return res.data;
}
```

**Эквивалент на fetch:**
```typescript
async function createCar(car: Car): Promise<Car> {
  const res = await fetch('http://localhost:8080/api/cars', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car),
  });
  if (!res.ok) throw new Error('Failed to create car');
  return res.json();
}
```

### 5. PUT запрос — обновление (ГЛАВА 10, пункт 2)

**hooks/useCars.ts:**

```typescript
async function updateCar(car: Car): Promise<Car> {
  if (!car.id) {
    throw new Error('Car id is required');  // ✅ Проверка наличия id
  }
  const res = await axiosClient.put<Car>(`/cars/${car.id}`, car);  // ✅ PUT запрос
  return res.data;
}
```

### 6. DELETE запрос — удаление (ГЛАВА 10, пункт 2)

**hooks/useCars.ts:**

```typescript
async function deleteCar(id: number): Promise<void> {
  await axiosClient.delete(`/cars/${id}`);  // ✅ DELETE запрос
}
```

### 7. React Query: Mutations (POST/PUT/DELETE) (ГЛАВА 10, пункт 4)

**hooks/useCars.ts:**

```typescript
const createMutation = useMutation({  // ✅ Mutation для создания (ГЛАВА 10, пункт 4)
  mutationFn: createCar,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cars'] });  // ✅ Обновляем кэш
  },
});

const updateMutation = useMutation({
  mutationFn: updateCar,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cars'] });  // ✅ Обновляем кэш
  },
});

const deleteMutation = useMutation({
  mutationFn: deleteCar,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cars'] });  // ✅ Обновляем кэш
  },
});
```

**Что происходит:**
1. `mutationFn` — функция, которая выполняет запрос
2. `onSuccess` — вызывается после успешного запроса
3. `invalidateQueries` — помечает кэш как устаревший, React Query автоматически перезапрашивает данные

**Использование в CarsPage.tsx:**

```typescript
const handleSubmit = (car: Car) => {
  if (car.id) {
    updateMutation.mutate(car);      // ✅ Вызываем mutation для обновления
  } else {
    createMutation.mutate(car);       // ✅ Вызываем mutation для создания
  }
  setOpenForm(false);
};

const handleConfirmDelete = () => {
  if (deleteTarget?.id) {
    deleteMutation.mutate(deleteTarget.id);  // ✅ Вызываем mutation для удаления
  }
  setDeleteTarget(null);
};
```

**Состояния mutation:**
- `createMutation.isPending` — идёт ли запрос
- `createMutation.isError` — была ли ошибка
- `createMutation.error` — объект ошибки

---

## 🧩 ГЛАВА 11: UI и удобные компоненты (таблицы, формы, диалоги)

### 1. Таблица машин (MUI Table) (ГЛАВА 11, пункт 1)

**CarsPage.tsx:**

```typescript
<TableContainer>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Brand</TableCell>
        <TableCell>Model</TableCell>
        <TableCell>Color</TableCell>
        {/* ... */}
      </TableRow>
    </TableHead>
    <TableBody>
      {cars.map((car) => (  // ✅ Рендерим список машин (ГЛАВА 11, пункт 1)
        <TableRow key={car.id ?? car.registerNumber}>
          <TableCell>{car.brand}</TableCell>
          <TableCell>{car.model}</TableCell>
          <TableCell>
            <Box
              component="span"
              sx={{
                backgroundColor: car.color?.toLowerCase() || '#e0e0e0',
                // ... стили для цветного бейджа
              }}
            >
              {car.color || 'N/A'}
            </Box>
          </TableCell>
          {/* ... */}
        </TableRow>
      ))}
    </TableBody>
  </Table>
</TableContainer>
```

**Особенности:**
- Используется Material UI Table
- Каждая строка — одна машина из массива `cars`
- `key` обязателен для React (уникальный идентификатор)

### 2. Диалог создания/редактирования (ГЛАВА 11, пункт 2)

**CarFormDialog.tsx:**

```typescript
export default function CarFormDialog({
  open,           // ✅ Управляет видимостью диалога
  initialCar,      // ✅ null = создание, Car = редактирование
  loading,         // ✅ Блокирует кнопки во время запроса
  onClose,         // ✅ Закрывает диалог
  onSubmit,        // ✅ Отправляет данные в родительский компонент
}: CarFormDialogProps) {
  const [car, setCar] = useState<Car>(emptyCar);  // ✅ Локальное состояние формы

  useEffect(() => {
    if (initialCar) {
      setCar(initialCar);    // ✅ Заполняем форму при редактировании
    } else {
      setCar(emptyCar);      // ✅ Очищаем форму при создании
    }
  }, [initialCar, open]);

  const handleChange = (field: keyof Car) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = field === 'year' || field === 'price'
      ? Number(event.target.value)  // ✅ Преобразуем в число
      : event.target.value;

    setCar((prev) => ({
      ...prev,
      [field]: value,  // ✅ Обновляем только одно поле
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{car.id ? 'Edit car' : 'Add new car'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Brand"
          value={car.brand}
          onChange={handleChange('brand')}  // ✅ Обработчик изменения
          fullWidth
        />
        {/* ... остальные поля ... */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={loading}>
          {car.id ? 'Save Changes' : 'Create Car'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

**Паттерн работы:**
1. **Создание:** `initialCar = null` → форма пустая → `onSubmit` без `id` → POST запрос
2. **Редактирование:** `initialCar = Car` → форма заполнена → `onSubmit` с `id` → PUT запрос

**Использование в CarsPage.tsx:**

```typescript
const handleAddClick = () => {
  setEditingCar(null);    // ✅ null = создание новой машины
  setOpenForm(true);
};

const handleEditClick = (car: Car) => {
  setEditingCar(car);     // ✅ Car = редактирование существующей
  setOpenForm(true);
};

<CarFormDialog
  open={openForm}
  initialCar={editingCar}  // ✅ null или Car
  onSubmit={handleSubmit}
/>
```

### 3. Диалог подтверждения удаления (ГЛАВА 11, пункт 3)

**ConfirmDialog.tsx:**

```typescript
export default function ConfirmDialog({
  open,
  title,
  content,
  loading,
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>Cancel</Button>
        <Button onClick={onConfirm} disabled={loading} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
```

**Использование в CarsPage.tsx:**

```typescript
const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);

const handleDeleteClick = (car: Car) => {
  setDeleteTarget(car);  // ✅ Устанавливаем машину для удаления
};

const handleConfirmDelete = () => {
  if (deleteTarget?.id) {
    deleteMutation.mutate(deleteTarget.id);  // ✅ Выполняем удаление
  }
  setDeleteTarget(null);  // ✅ Закрываем диалог
};

<ConfirmDialog
  open={!!deleteTarget}  // ✅ true, если deleteTarget не null
  title="Delete car"
  content={`Delete car ${deleteTarget?.brand ?? ''} ${deleteTarget?.model ?? ''}?`}
  onCancel={() => setDeleteTarget(null)}
  onConfirm={handleConfirmDelete}
  loading={deleteMutation.isPending}
/>
```

**Паттерн:**
- `deleteTarget` хранит машину, которую хотят удалить
- `open={!!deleteTarget}` — диалог открыт, если `deleteTarget` не null
- При подтверждении → вызывается `deleteMutation.mutate()`
- После успеха → `invalidateQueries` обновляет список

### 4. Состояние UI (ГЛАВА 11, пункт 4)

**Паттерн управления UI в CarsPage:**

```typescript
// ✅ Состояния для управления диалогами
const [openForm, setOpenForm] = useState(false);           // Диалог формы
const [editingCar, setEditingCar] = useState<Car | null>(null);  // Редактируемая машина
const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);  // Машина для удаления

// ✅ Обработчики открытия диалогов
const handleAddClick = () => {
  setEditingCar(null);
  setOpenForm(true);
};

const handleEditClick = (car: Car) => {
  setEditingCar(car);
  setOpenForm(true);
};

const handleDeleteClick = (car: Car) => {
  setDeleteTarget(car);
};

// ✅ Обработчики действий
const handleSubmit = (car: Car) => {
  if (car.id) {
    updateMutation.mutate(car);
  } else {
    createMutation.mutate(car);
  }
  setOpenForm(false);  // ✅ Закрываем диалог после отправки
};

const handleConfirmDelete = () => {
  if (deleteTarget?.id) {
    deleteMutation.mutate(deleteTarget.id);
  }
  setDeleteTarget(null);  // ✅ Закрываем диалог после удаления
};
```

**Принцип:**
- **CarsPage** управляет состоянием (какой диалог открыт, что редактируется)
- **Компоненты диалогов** только отображают UI и вызывают колбэки
- Разделение ответственности: логика в родителе, UI в дочерних компонентах

---

## 🧩 ГЛАВА 12: Полная интеграция (Spring Boot + React)

### 1. Связь фронта с backend (ГЛАВА 12, пункт 3)

**Полный цикл работы:**

```
1. Пользователь открывает CarsPage
   ↓
2. React Query вызывает fetchCars()
   ↓
3. axiosClient.get('/cars') → GET http://localhost:8080/api/cars
   ↓
4. Spring Boot контроллер @GetMapping("/api/cars")
   ↓
5. CarService.getAll() → CarRepository.findAll()
   ↓
6. JPA запрос к PostgreSQL
   ↓
7. Данные возвращаются: List<CarDTO> → JSON
   ↓
8. React Query получает JSON → парсит в Car[]
   ↓
9. carsQuery.data = Car[]
   ↓
10. CarsPage рендерит таблицу с машинами
```

**Пример запроса:**

```typescript
// Фронт: hooks/useCars.ts
async function fetchCars(): Promise<Car[]> {
  const res = await axiosClient.get<Car[]>('/cars');
  // GET http://localhost:8080/api/cars
  return res.data;
}

// Backend (Spring Boot): CarController.java
@GetMapping
public List<CarDTO> getAll() {
  return carService.getAll().stream().map(this::toDto).toList();
}
```

### 2. Создание машины (ГЛАВА 12, пункт 3)

**Полный цикл:**

```
1. Пользователь нажимает "Add car"
   ↓
2. Открывается CarFormDialog (initialCar = null)
   ↓
3. Пользователь заполняет форму и нажимает "Create Car"
   ↓
4. handleSubmit(car) вызывается в CarsPage
   ↓
5. createMutation.mutate(car) → createCar(car)
   ↓
6. axiosClient.post('/cars', car) → POST http://localhost:8080/api/cars
   ↓
7. Spring Boot: @PostMapping → CarController.create()
   ↓
8. CarService.save(car) → CarRepository.save()
   ↓
9. JPA сохраняет в PostgreSQL
   ↓
10. Возвращается CarDTO → JSON
   ↓
11. onSuccess → invalidateQueries(['cars'])
   ↓
12. React Query автоматически перезапрашивает список
   ↓
13. Таблица обновляется с новой машиной
```

**Код:**

```typescript
// Фронт: hooks/useCars.ts
async function createCar(car: Car): Promise<Car> {
  const res = await axiosClient.post<Car>('/cars', car);
  return res.data;
}

const createMutation = useMutation({
  mutationFn: createCar,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['cars'] });  // ✅ Обновляем список
  },
});

// Backend (Spring Boot): CarController.java
@PostMapping
public ResponseEntity<CarDTO> create(@Valid @RequestBody CarDTO dto) {
  Car saved = carService.save(fromDto(dto));
  return ResponseEntity.created(URI.create("/api/cars/" + saved.getId()))
    .body(toDto(saved));
}
```

### 3. Обновление машины (ГЛАВА 12, пункт 3)

**Полный цикл:**

```
1. Пользователь нажимает Edit на машине
   ↓
2. handleEditClick(car) → setEditingCar(car) → setOpenForm(true)
   ↓
3. CarFormDialog открывается с initialCar = car
   ↓
4. useEffect заполняет форму данными машины
   ↓
5. Пользователь изменяет данные и нажимает "Save Changes"
   ↓
6. handleSubmit(car) → updateMutation.mutate(car)
   ↓
7. axiosClient.put(`/cars/${car.id}`, car) → PUT http://localhost:8080/api/cars/1
   ↓
8. Spring Boot: @PutMapping("/{id}") → CarController.update()
   ↓
9. CarService.update(id, car) → обновляет в БД
   ↓
10. invalidateQueries → список обновляется
```

**Код:**

```typescript
// Фронт
async function updateCar(car: Car): Promise<Car> {
  if (!car.id) throw new Error('Car id is required');
  const res = await axiosClient.put<Car>(`/cars/${car.id}`, car);
  return res.data;
}

// Backend
@PutMapping("/{id}")
public ResponseEntity<CarDTO> update(@PathVariable Long id, @Valid @RequestBody CarDTO dto) {
  Car updated = carService.update(id, fromDto(dto));
  return ResponseEntity.ok(toDto(updated));
}
```

### 4. Удаление машины (ГЛАВА 12, пункт 3)

**Полный цикл:**

```
1. Пользователь нажимает Delete на машине
   ↓
2. handleDeleteClick(car) → setDeleteTarget(car)
   ↓
3. ConfirmDialog открывается (open={!!deleteTarget})
   ↓
4. Пользователь подтверждает удаление
   ↓
5. handleConfirmDelete() → deleteMutation.mutate(car.id)
   ↓
6. axiosClient.delete(`/cars/${id}`) → DELETE http://localhost:8080/api/cars/1
   ↓
7. Spring Boot: @DeleteMapping("/{id}") → CarController.delete()
   ↓
8. CarService.delete(id) → удаляет из БД
   ↓
9. invalidateQueries → список обновляется
```

**Код:**

```typescript
// Фронт
async function deleteCar(id: number): Promise<void> {
  await axiosClient.delete(`/cars/${id}`);
}

// Backend
@DeleteMapping("/{id}")
public ResponseEntity<Void> delete(@PathVariable Long id) {
  carService.delete(id);
  return ResponseEntity.noContent().build();
}
```

### 5. CORS и безопасность (ГЛАВА 12, пункт 2)

**На backend (Spring Boot) должно быть:**

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")  // ✅ Фронт на Vite
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
    }
}
```

**Без этого:**
- Браузер блокирует запросы с `http://localhost:5173` к `http://localhost:8080`
- Ошибка: `CORS policy: No 'Access-Control-Allow-Origin' header`

---

## 🎯 РЕЗЮМЕ: Как всё связано

### Архитектура приложения:

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (React)                      │
├─────────────────────────────────────────────────────────┤
│  CarsPage.tsx                                           │
│    ├─ useCars() → useQuery + useMutation                │
│    ├─ useState → управление UI (диалоги)                │
│    └─ Компоненты: CarFormDialog, ConfirmDialog          │
│                                                          │
│  hooks/useCars.ts                                        │
│    ├─ fetchCars() → GET /api/cars                       │
│    ├─ createCar() → POST /api/cars                      │
│    ├─ updateCar() → PUT /api/cars/{id}                  │
│    └─ deleteCar() → DELETE /api/cars/{id}               │
│                                                          │
│  api/axiosClient.ts                                      │
│    └─ baseURL: http://localhost:8080/api                │
└─────────────────────────────────────────────────────────┘
                        ↕ HTTP (REST API)
┌─────────────────────────────────────────────────────────┐
│                    BACKEND (Spring Boot)                 │
├─────────────────────────────────────────────────────────┤
│  CarController.java                                      │
│    ├─ @GetMapping → getAll()                            │
│    ├─ @PostMapping → create()                           │
│    ├─ @PutMapping → update()                            │
│    └─ @DeleteMapping → delete()                         │
│                                                          │
│  CarService.java                                         │
│    └─ Бизнес-логика                                     │
│                                                          │
│  CarRepository.java (JPA)                                │
│    └─ findAll(), save(), deleteById()                   │
│                                                          │
│  PostgreSQL Database                                     │
│    └─ Таблица cars                                      │
└─────────────────────────────────────────────────────────┘
```

### Поток данных:

1. **Загрузка списка:**
   - `CarsPage` монтируется → `useCars()` → `useQuery` → `fetchCars()` → GET запрос → Backend → БД → JSON → `carsQuery.data` → таблица

2. **Создание:**
   - Кнопка "Add car" → `setOpenForm(true)` → форма → `onSubmit` → `createMutation.mutate()` → POST запрос → Backend → БД → `invalidateQueries` → список обновляется

3. **Редактирование:**
   - Кнопка Edit → `setEditingCar(car)` → форма заполняется → `onSubmit` → `updateMutation.mutate()` → PUT запрос → Backend → БД → `invalidateQueries` → список обновляется

4. **Удаление:**
   - Кнопка Delete → `setDeleteTarget(car)` → диалог подтверждения → `deleteMutation.mutate()` → DELETE запрос → Backend → БД → `invalidateQueries` → список обновляется

---

## ✅ Контрольный список: что ты должен понимать

После изучения этого кода ты должен уметь:

- [x] Создать React проект с Vite
- [x] Настроить React Query (QueryClientProvider)
- [x] Использовать useState для управления состоянием
- [x] Использовать useEffect для сайд-эффектов
- [x] Типизировать компоненты и функции в TypeScript
- [x] Делать GET/POST/PUT/DELETE запросы через axios
- [x] Использовать useQuery для загрузки данных
- [x] Использовать useMutation для изменений данных
- [x] Создавать формы с Material UI
- [x] Создавать диалоги (Dialog, DialogTitle, DialogContent)
- [x] Рендерить списки через map
- [x] Обрабатывать состояния загрузки и ошибок
- [x] Понимать полный цикл: Frontend → Backend → Database

---

**Готово!** Теперь весь код проекта объяснён в контексте глав 7-12. Если нужны дополнительные пояснения по какой-то части — спрашивай! 🚀

