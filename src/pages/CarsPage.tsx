import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  CircularProgress,
  Stack,
  Button,
  Box,
  Snackbar,
  Alert,
  Tooltip,
} from '@mui/material';
import { Add, Delete, Edit, FileDownload } from '@mui/icons-material';
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
              transform: 'translateY(-3px) scale(1.02)',
            },
            px: 4,
            py: 1.5,
            fontWeight: 700,
            textTransform: 'none',
            fontSize: '1rem',
            borderRadius: 2,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          Add car
        </Button>
        
        </Stack>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 4,
          overflow: 'hidden',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 188, 212, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.2) 0%, rgba(0, 151, 167, 0.2) 100%)',
                borderBottom: '2px solid rgba(0, 188, 212, 0.3)',
              }}>
                <TableCell sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Brand</TableCell>
                <TableCell sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Model</TableCell>
                <TableCell sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Color</TableCell>
                <TableCell sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Reg. number</TableCell>
                <TableCell sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Year</TableCell>
                <TableCell align="right" sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Price</TableCell>
                <TableCell align="right" sx={{ color: '#00BCD4', fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.5px' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car, index) => (
                <TableRow 
                  key={car.id ?? car.registerNumber}
                  sx={{
                    borderBottom: '1px solid rgba(0, 188, 212, 0.1)',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 188, 212, 0.08)',
                      transform: 'scale(1.005)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    animation: `fadeIn 0.4s ease ${index * 0.05}s both`,
                    '@keyframes fadeIn': {
                      from: { opacity: 0, transform: 'translateY(15px)' },
                      to: { opacity: 1, transform: 'translateY(0)' },
                    },
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, fontSize: '0.95rem', color: '#E0F7FA' }}>{car.brand}</TableCell>
                  <TableCell sx={{ fontSize: '0.95rem', color: '#B2EBF2' }}>{car.model}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        backgroundColor: car.color?.toLowerCase() || 'rgba(0, 188, 212, 0.2)',
                        color: car.color ? 'white' : '#00BCD4',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textTransform: 'capitalize',
                        minWidth: 60,
                        textAlign: 'center',
                        border: '1px solid rgba(0, 188, 212, 0.3)',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      {car.color || 'N/A'}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.95rem', fontWeight: 600, color: '#00BCD4' }}>
                    {car.registerNumber}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.95rem', color: '#B2EBF2' }}>{car.year}</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700, fontSize: '1rem', color: '#00E5FF' }}>
                    ${car.price?.toLocaleString() || '0'}
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <Tooltip title="Edit car">
                        <IconButton 
                          aria-label={`edit-${car.id ?? car.registerNumber}`}
                          size="small" 
                          onClick={() => handleEditClick(car)}
                          sx={{
                            color: '#00BCD4',
                            '&:hover': {
                              backgroundColor: 'rgba(0, 188, 212, 0.2)',
                              transform: 'scale(1.15) rotate(5deg)',
                              color: '#00E5FF',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete car">
                        <IconButton 
                          aria-label={`delete-${car.id ?? car.registerNumber}`}
                          size="small" 
                          onClick={() => handleDeleteClick(car)}
                          sx={{
                            color: '#FF5252',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 82, 82, 0.2)',
                              transform: 'scale(1.15) rotate(-5deg)',
                              color: '#FF1744',
                            },
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {cars.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7}>
                    <Typography 
                      align="center" 
                      sx={{ 
                        py: 4,
                        color: '#80DEEA',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                      }}
                    >
                      No cars found. Click "Add car" to get started!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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

