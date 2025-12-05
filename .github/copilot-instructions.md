# Copilot Instructions for Full-Stack Car Database App

## Project Overview

This is a **React + TypeScript + Vite** frontend application for a car database management system. It communicates with a backend API (running on `http://localhost:8080/api`) and uses modern patterns for state management, data fetching, and UI.

**Key Tech Stack:**
- React 19 with TypeScript 5.7
- Vite 7.1 (build tool with HMR)
- React Router 7.0 (client-side routing)
- TanStack React Query 5.62 (server state management)
- Material-UI 6.1 (component library)
- Axios (HTTP client with interceptors)

## Architecture & Data Flow

### Three-Layer Architecture

1. **API Layer** (`src/api/axiosClient.ts`)
   - Centralized Axios instance with `baseURL: 'http://localhost:8080/api'`
   - Request interceptor: auto-injects JWT token from `localStorage['auth_token']`
   - Response interceptor: handles 401 errors by redirecting to `/login`
   - All HTTP errors are caught and logged

2. **State Management Layer** (`src/contexts/AuthContext.tsx`, `src/hooks/useCars.ts`)
   - **Auth Context**: manages JWT token, provides `useAuth()` hook
   - **React Query**: `useCars()` hook encapsulates all car CRUD operations with optimistic updates
   - Query key: `['cars']` — invalidated on any mutation to refetch

3. **UI Layer** (`src/pages/`, `src/components/`)
   - Pages handle routing logic and component composition
   - Components are stateless/controlled (e.g., `CarFormDialog`, `ConfirmDialog`)
   - MUI components styled with inline `sx` props (emotion-based)

### Authentication Flow

1. User submits form on `LoginPage` → POST to `/auth/login`
2. Backend returns JWT token
3. `useAuth().login(token)` stores token in `localStorage` and context state
4. Subsequent requests auto-include `Authorization: Bearer {token}` header
5. 401 response triggers logout and redirect to `/login`

### Car CRUD Data Flow

```
CarsPage (UI + state orchestration)
  ↓ calls
useCars() (React Query mutations/queries)
  ↓ calls
axiosClient.post/put/delete/get
  ↓ includes token via interceptor
Backend API at http://localhost:8080/api
```

## Project-Specific Patterns

### Hook-Based Mutations Pattern

Instead of inline mutation logic, all API operations are in `useCars.ts`:

```typescript
// CORRECT: Use the hook
const { createMutation } = useCars();
createMutation.mutate(carData); // Triggers auto-refetch via onSuccess

// INCORRECT: Direct axios calls bypass React Query cache
axiosClient.post('/cars', carData); // No automatic cache invalidation
```

### Form Dialog Pattern

Reusable dialogs are controlled components:
- `initialCar: Car | null` — `null` for create, car object for edit
- `useEffect(() => { setCar(initialCar ? initialCar : emptyCar) })` — resets on open/close
- `onSubmit(car)` callback — parent page calls mutation
- Dialog closes after parent receives `onSuccess` from mutation

See `CarFormDialog.tsx` for implementation.

### Snackbar Notifications Pattern

All mutations (create, update, delete) trigger success/error messages:

```typescript
// Track mutation success in useEffect
useEffect(() => {
  if (createMutation.isSuccess) {
    setSnackbar({
      open: true,
      message: 'Car created successfully!',
      severity: 'success',
    });
  }
}, [createMutation.isSuccess]);

// Track mutation errors
useEffect(() => {
  if (createMutation.isError) {
    setSnackbar({
      open: true,
      message: `Error: ${createMutation.error?.message}`,
      severity: 'error',
    });
  }
}, [createMutation.isError, createMutation.error]);
```

Snackbar auto-hides after 4 seconds and appears bottom-right. See `CarsPage.tsx` for full implementation.

### Confirmation Dialog Pattern

Delete operations require confirmation via `ConfirmDialog` component:
- Shows brand and model in confirmation message
- User must click "Confirm" to proceed
- Only then mutation is triggered

See `CarsPage.tsx` line ~38 for usage example.

### Icon Buttons & Accessibility

- Icon buttons (edit/delete) use `IconButton` with `@mui/icons-material` icons and are wrapped in `Tooltip` for clarity. See `src/pages/CarsPage.tsx`.
- Each icon button includes an `aria-label` (e.g. `edit-<id>`, `delete-<id>`) to support screen readers.
- Prefer `Tooltip` with a short title (e.g. "Edit car", "Delete car").

## Build & Development Workflow

**Available Scripts** (from `package.json`):
- `npm run dev` — Start Vite dev server with HMR (React Fast Refresh enabled)
- `npm run build` — Build optimized production bundle (`dist/`)
- `npm run lint` — Run ESLint (no auto-fix configured)
- `npm run preview` — Preview production build locally

**Key Build Configuration:**
- TypeScript strict mode enabled in `tsconfig.app.json`
- ESLint: Flat config (`eslint.config.js`) with React hooks plugin
- No testing framework configured yet (vitest/jest not installed)

**Data Grid Features** (if MUI X-Grid is installed):
- CSV export via DataGrid toolbar
- Paging, filtering, and sorting out-of-the-box
- Note: Current implementation uses Table component for simpler styling control

## Common Developer Tasks

### Adding a New Page

1. Create file in `src/pages/YourPage.tsx` (use `.tsx` extension)
2. Add route in `App.tsx` Routes section
3. Add navigation link in AppBar if needed
4. Use `useAuth()` to check authentication
5. Follow CarsPage pattern for data fetching (use custom hooks)

### Adding an API Endpoint

1. Add fetch/mutation functions to `src/hooks/useCars.ts` (or new hook)
2. Export custom `useYourFeature()` hook
3. Wrap mutations with `queryClient.invalidateQueries()` in `onSuccess`
4. Always handle errors in component with `.isLoading`, `.isError` states

### Styling

- Use MUI `sx` prop for component-level styles (no separate CSS files)
- Global styles in `src/index.css` (reset, fonts)
- Theme: currently inline with gradient colors (`#00BCD4`, `#0097A7`)
- No theme provider configured; direct hex values used

### Token Management

- Token stored in `localStorage['auth_token']`
- Updated via `AuthContext.login(token)`
- Auto-removed on 401 errors
- Custom contexts/hooks must check `token` from `useAuth()` before API calls

## Known Constraints & Decisions

- **No global error handler**: Each page/component handles errors independently
- **No environment config**: API URL hardcoded as `http://localhost:8080/api` in `axiosClient.ts`
- **No testing**: No test framework installed; consider vitest for future
- **MUI v6 (latest)**: Not v5; import paths and prop names may differ from older docs
- **Cyrillic comments in code**: Code comments partially in Russian; maintain this if editing
- **Authentication page redirect**: `isAuthPage` logic hides AppBar on `/login` and `/register`

## Debugging Tips

1. **API calls failing?** Check browser DevTools Network tab for actual request/response
2. **Token not being sent?** Verify token in `localStorage` via console: `localStorage.getItem('auth_token')`
3. **React Query cache stale?** Manually invalidate: `queryClient.invalidateQueries({ queryKey: ['cars'] })`
4. **HMR not working?** Restart dev server; check Vite logs
5. **TypeScript errors?** Run lint: `npm run lint` — uses `@typescript-eslint` strict rules

## File Structure Summary

```
src/
  ├── api/axiosClient.ts         # Centralized HTTP client with interceptors
  ├── contexts/AuthContext.tsx    # Authentication provider & hook
  ├── hooks/useCars.ts            # React Query mutations/queries for cars
  ├── pages/                      # Route-level components
  │   ├── CarsPage.tsx           # Main CRUD UI (table + dialogs)
  │   ├── LoginPage.tsx          # Auth entry point
  │   ├── RegisterPage.tsx       # Registration (backend required)
  │   ├── AboutPage.tsx          # Static page
  │   └── NotFoundPage.tsx       # 404 fallback
  ├── components/                # Reusable UI components
  │   ├── CarFormDialog.tsx      # Form for create/edit car
  │   └── ConfirmDialog.tsx      # Generic confirmation modal
  ├── types.ts                    # Domain type definitions
  ├── App.tsx                     # Router setup + AppBar
  └── main.tsx                    # React entry point with providers
```


**Last Updated:** December 2025  
**For Backend:** This is the **frontend** repository. Backend API documentation is separate.

## CSV Export Functionality

**Location:** `src/utils/csvExport.ts`

The `exportCarsToCSV()` function enables downloading car data as CSV:

```typescript
import { exportCarsToCSV } from '../utils/csvExport';

// Export cars with custom filename
exportCarsToCSV(cars, 'cars-2025-12-05.csv');
```

**Features:**
- Proper CSV formatting with quoted fields
- Includes all car properties (brand, model, color, registration number, year, price)
- Automatic filename with ISO date: `cars-YYYY-MM-DD.csv`
- Disabled when no cars available

**Integration:**
- Button in `CarsPage.tsx` with FileDownload icon
- Uses Blob API for client-side download
- No server request needed
