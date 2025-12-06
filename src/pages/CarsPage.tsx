import {
  Typography,
  IconButton,
  CircularProgress,
  Stack,
  Button,
  Box,
  Snackbar,
  Alert,
  Tooltip,
  Chip,
} from '@mui/material';
import { Add, Delete, Edit, FileDownload } from '@mui/icons-material';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useCars } from '../hooks/useCars';
import { Car } from '../types';
import CarFormDialog from '../components/CarFormDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import { exportCarsToCSV } from '../utils/csvExport';

export default function CarsPage() {
  const { carsQuery, createMutation, updateMutation, deleteMutation } = useCars();
  const [openForm, setOpenForm] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

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

  const handleSubmit = (car: Car) => {
    if (car.id) {
      updateMutation.mutate(car);
    } else {
      createMutation.mutate(car);
    }
    setOpenForm(false);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget?.id) {
      deleteMutation.mutate(deleteTarget.id);
    }
    setDeleteTarget(null);
  };

  // Отслеживание успеха мутаций
  useEffect(() => {
    if (createMutation.isSuccess) {
      setSnackbar({
        open: true,
        message: 'Car created successfully!',
        severity: 'success',
      });
    }
  }, [createMutation.isSuccess]);

  useEffect(() => {
    if (updateMutation.isSuccess) {
      setSnackbar({
        open: true,
        message: 'Car updated successfully!',
        severity: 'success',
      });
    }
  }, [updateMutation.isSuccess]);

  useEffect(() => {
    if (deleteMutation.isSuccess) {
      setSnackbar({
        open: true,
        message: 'Car deleted successfully!',
        severity: 'success',
      });
    }
  }, [deleteMutation.isSuccess]);

  // Отслеживание ошибок мутаций
  useEffect(() => {
    if (createMutation.isError) {
      setSnackbar({
        open: true,
        message: `Error creating car: ${createMutation.error?.message || 'Unknown error'}`,
        severity: 'error',
      });
    }
  }, [createMutation.isError, createMutation.error]);

  useEffect(() => {
    if (updateMutation.isError) {
      setSnackbar({
        open: true,
        message: `Error updating car: ${updateMutation.error?.message || 'Unknown error'}`,
        severity: 'error',
      });
    }
  }, [updateMutation.isError, updateMutation.error]);

  useEffect(() => {
    if (deleteMutation.isError) {
      setSnackbar({
        open: true,
        message: `Error deleting car: ${deleteMutation.error?.message || 'Unknown error'}`,
        severity: 'error',
      });
    }
  }, [deleteMutation.isError, deleteMutation.error]);

  if (carsQuery.isLoading) {
    return (
      <Stack alignItems="center" mt={4}>
        <CircularProgress />
      </Stack>
    );
  }

  if (carsQuery.isError) {
    return (
      <Typography color="error">
        Error loading cars: {(carsQuery.error as Error).message}
      </Typography>
    );
  }

  const cars = carsQuery.data ?? [];

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 220, sortable: true, filterable: true },
    { field: 'model', headerName: 'Model', width: 240, sortable: true, filterable: true },
    {
      field: 'color',
      headerName: 'Color',
      width: 140,
      sortable: true,
      filterable: true,
      renderCell: (params: GridCellParams) => {
        const value = (params.value || '').toString();
        const bg = (() => {
          const v = value.toLowerCase();
          if (v.includes('red')) return '#f44336';
          if (v.includes('black')) return '#000000';
          if (v.includes('blue')) return '#1976d2';
          if (v.includes('white')) return '#ffffff';
          if (v.includes('green')) return '#2e7d32';
          return 'rgba(255,255,255,0.08)';
        })();
        return (
          <Chip
            label={value || 'N/A'}
            size="small"
            sx={{
              backgroundColor: bg,
              color: bg === '#ffffff' ? '#000' : '#fff',
              fontWeight: 700,
            }}
          />
        );
      },
    },
    { field: 'registerNumber', headerName: 'Reg. number', width: 160, sortable: true, filterable: true },
    { field: 'year', headerName: 'Year', width: 110, sortable: true, filterable: true },
    {
      field: 'price',
      headerName: 'Price',
      width: 140,
      sortable: true,
      filterable: true,
      renderCell: (params: GridCellParams) => {
        const value = Number(params.value || 0);
        return (
          <Typography sx={{ fontWeight: 700, color: '#00E5FF', marginLeft: 'auto', paddingRight: 1, display: 'flex', alignItems: 'center', height: '100%' }}>
            {value === 0 ? '-' : `$${value.toLocaleString()}`}
          </Typography>
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <>
          <Tooltip title="Edit car">
            <IconButton
              aria-label={`edit-${params.row.id}`}
              size="small"
              onClick={() => handleEditClick(params.row as Car)}
              sx={{
                color: '#00BCD4',
                '&:hover': {
                  backgroundColor: 'rgba(0, 188, 212, 0.2)',
                  color: '#00E5FF',
                },
              }}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete car">
            <IconButton
              aria-label={`delete-${params.row.id}`}
              size="small"
              onClick={() => handleDeleteClick(params.row as Car)}
              sx={{
                color: '#FF5252',
                '&:hover': {
                  backgroundColor: 'rgba(255, 82, 82, 0.2)',
                  color: '#FF1744',
                },
              }}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={4} alignItems="center">
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00BCD4 0%, #00E5FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 20px rgba(0, 188, 212, 0.3)',
            letterSpacing: '0.5px',
          }}
        >
          Cars
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button 
            variant="outlined" 
            startIcon={<FileDownload />} 
            onClick={() => exportCarsToCSV(cars, `cars-${new Date().toISOString().split('T')[0]}.csv`)}
            disabled={cars.length === 0}
            sx={{
              borderColor: '#00BCD4',
              color: '#00BCD4',
              '&:hover': {
                borderColor: '#00E5FF',
                backgroundColor: 'rgba(0, 188, 212, 0.1)',
              },
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '0.95rem',
            }}
          >
            Export CSV
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Add />} 
            onClick={handleAddClick}
            sx={{
              background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
              boxShadow: '0 4px 20px rgba(0, 188, 212, 0.4)',
              color: 'white',
              '&:hover': {
                background: 'linear-gradient(135deg, #00E5FF 0%, #00BCD4 100%)',
                boxShadow: '0 8px 30px rgba(0, 188, 212, 0.6)',
              },
              px: 4,
              py: 1.5,
              fontWeight: 700,
              textTransform: 'none',
              fontSize: '1rem',
              borderRadius: 2,
            }}
          >
            Add car
          </Button>
        </Stack>
      </Stack>

      <Box
        sx={{
          height: 650,
          width: '100%',
          borderRadius: 3,
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(15, 32, 60, 0.95) 0%, rgba(10, 25, 47, 0.98) 100%)',
          border: '1px solid rgba(0, 229, 255, 0.25)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(0, 229, 255, 0.1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '& .MuiDataGrid-root': {
            backgroundColor: 'transparent',
            color: '#B2EBF2',
            border: 'none',
            fontWeight: 500,
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'transparent !important',
            backgroundImage: 'none !important',
          },
          '& .MuiDataGrid-columnHeader': {
            background: 'transparent !important',
            borderBottom: '2px solid rgba(0, 229, 255, 0.4)',
            boxShadow: '0 4px 16px rgba(0, 229, 255, 0.15)',
            '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 800,
            color: '#00E5FF',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            fontSize: '0.85rem',
          },
          '& .MuiDataGrid-sortIcon': {
            opacity: 0,
            transition: 'opacity 0.2s ease',
          },
          '& .MuiDataGrid-columnHeader:hover .MuiDataGrid-sortIcon': {
            opacity: 1,
          },
          '& .MuiDataGrid-columnHeader--sorted .MuiDataGrid-sortIcon': {
            opacity: 1,
          },
          },
          '& .MuiDataGrid-row': {
            borderBottom: '1px solid rgba(0, 188, 212, 0.08)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: 'rgba(0, 188, 212, 0.12)',
              boxShadow: 'inset 0 0 20px rgba(0, 229, 255, 0.1)',
              transform: 'scale(1.001)',
            },
            '&:nth-of-type(odd)': {
              backgroundColor: 'rgba(0, 229, 255, 0.02)',
            },
          },
          '& .MuiDataGrid-cell': {
            color: '#B2EBF2',
            fontSize: '0.95rem',
            paddingY: '12px',
            borderColor: 'rgba(0, 188, 212, 0.08)',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '2px solid rgba(0, 188, 212, 0.2)',
            background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.08) 0%, rgba(0, 151, 167, 0.06) 100%)',
            color: '#00BCD4',
            fontWeight: 600,
          },
          '& .MuiTablePagination-root': {
            color: '#00BCD4',
            '& .MuiIconButton-root': {
              color: '#00BCD4 !important',
              '&:hover': {
                backgroundColor: 'rgba(0, 188, 212, 0.15) !important',
              },
            },
          },
          '& .MuiIconButton-root': {
            color: '#00BCD4',
            transition: 'all 0.2s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 188, 212, 0.2)',
              color: '#00E5FF',
              transform: 'scale(1.1)',
            },
          },
          '& .MuiToolbar-root': {
            backgroundColor: 'rgba(0, 188, 212, 0.08)',
            borderBottom: '1px solid rgba(0, 188, 212, 0.15)',
            padding: '12px 16px',
          },
        }}
      >
        <DataGrid
          rows={cars}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          getRowId={(row) => row.id || row.registerNumber}
          rowHeight={56}
          density="comfortable"
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              minHeight: 56,
              height: 56,
            },
          }}
        />
      </Box>

      <CarFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        initialCar={editingCar}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
      />

      <ConfirmDialog
        open={!!deleteTarget}
        title="Delete car"
        content={`Delete car ${deleteTarget?.brand ?? ''} ${deleteTarget?.model ?? ''}?`}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
        loading={deleteMutation.isPending}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%', borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

