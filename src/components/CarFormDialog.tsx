import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Car } from '../types';

interface CarFormDialogProps {
  open: boolean;
  initialCar: Car | null;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (car: Car) => void;
}

const emptyCar: Car = {
  brand: '',
  model: '',
  color: '',
  registerNumber: '',
  year: new Date().getFullYear(),
  price: 0,
};

export default function CarFormDialog({
  open,
  initialCar,
  loading,
  onClose,
  onSubmit,
}: CarFormDialogProps) {
  const [car, setCar] = useState<Car>(emptyCar);

  useEffect(() => {
    if (initialCar) {
      setCar(initialCar);
    } else {
      setCar(emptyCar);
    }
  }, [initialCar, open]);

  const handleChange =
    (field: keyof Car) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        field === 'year' || field === 'price'
          ? Number(event.target.value)
          : event.target.value;

      setCar((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  const handleSubmit = () => {
    onSubmit(car);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: 'rgba(10, 14, 39, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 188, 212, 0.3)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(135deg, rgba(0, 188, 212, 0.2) 0%, rgba(0, 151, 167, 0.2) 100%)',
          borderBottom: '1px solid rgba(0, 188, 212, 0.3)',
          color: '#00BCD4',
          fontWeight: 800,
          fontSize: '1.5rem',
          pb: 2,
          letterSpacing: '0.5px',
        }}
      >
        {car.id ? 'Edit car' : 'Add new car'}
      </DialogTitle>
      <DialogContent sx={{ mt: 2, bgcolor: 'rgba(10, 14, 39, 0.5)' }}>
        <Stack spacing={3}>
          <TextField 
            label="Brand" 
            value={car.brand} 
            onChange={handleChange('brand')} 
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { color: '#80DEEA' },
              '& .MuiOutlinedInput-root': {
                color: '#E0F7FA',
                '& fieldset': { borderColor: 'rgba(0, 188, 212, 0.3)' },
                '&:hover fieldset': {
                  borderColor: '#00BCD4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00E5FF',
                  borderWidth: 2,
                },
              },
            }}
          />
          <TextField 
            label="Model" 
            value={car.model} 
            onChange={handleChange('model')} 
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiInputLabel-root': { color: '#80DEEA' },
              '& .MuiOutlinedInput-root': {
                color: '#E0F7FA',
                '& fieldset': { borderColor: 'rgba(0, 188, 212, 0.3)' },
                '&:hover fieldset': {
                  borderColor: '#00BCD4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00E5FF',
                  borderWidth: 2,
                },
              },
            }}
          />
          <TextField 
            label="Color" 
            value={car.color} 
            onChange={handleChange('color')} 
            fullWidth
            variant="outlined"
            placeholder="e.g., Red, Blue, Black"
            sx={{
              '& .MuiInputLabel-root': { color: '#80DEEA' },
              '& .MuiOutlinedInput-root': {
                color: '#E0F7FA',
                '& fieldset': { borderColor: 'rgba(0, 188, 212, 0.3)' },
                '&:hover fieldset': {
                  borderColor: '#00BCD4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00E5FF',
                  borderWidth: 2,
                },
              },
            }}
          />
          <TextField
            label="Register number"
            value={car.registerNumber}
            onChange={handleChange('registerNumber')}
            fullWidth
            variant="outlined"
            placeholder="ABC-1234"
            sx={{
              '& .MuiInputLabel-root': { color: '#80DEEA' },
              '& .MuiOutlinedInput-root': {
                fontFamily: 'monospace',
                color: '#E0F7FA',
                '& fieldset': { borderColor: 'rgba(0, 188, 212, 0.3)' },
                '&:hover fieldset': {
                  borderColor: '#00BCD4',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00E5FF',
                  borderWidth: 2,
                },
              },
            }}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Year"
              type="number"
              value={car.year}
              onChange={handleChange('year')}
              fullWidth
              variant="outlined"
              inputProps={{ min: 1900, max: new Date().getFullYear() + 1 }}
              sx={{
                '& .MuiInputLabel-root': { color: '#80DEEA' },
                '& .MuiOutlinedInput-root': {
                  color: '#E0F7FA',
                  '& fieldset': { borderColor: 'rgba(0, 188, 212, 0.3)' },
                  '&:hover fieldset': {
                    borderColor: '#00BCD4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00E5FF',
                    borderWidth: 2,
                  },
                },
              }}
            />
            <TextField
              label="Price ($)"
              type="number"
              value={car.price}
              onChange={handleChange('price')}
              fullWidth
              variant="outlined"
              inputProps={{ min: 0, step: 100 }}
              sx={{
                '& .MuiInputLabel-root': { color: '#80DEEA' },
                '& .MuiOutlinedInput-root': {
                  color: '#E0F7FA',
                  '& fieldset': { borderColor: 'rgba(0, 188, 212, 0.3)' },
                  '&:hover fieldset': {
                    borderColor: '#00BCD4',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00E5FF',
                    borderWidth: 2,
                  },
                },
              }}
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 3, pt: 2, bgcolor: 'rgba(10, 14, 39, 0.5)', borderTop: '1px solid rgba(0, 188, 212, 0.2)' }}>
        <Button 
          onClick={onClose} 
          disabled={loading}
          sx={{
            color: '#80DEEA',
            '&:hover': {
              backgroundColor: 'rgba(0, 188, 212, 0.1)',
              color: '#00BCD4',
            },
            textTransform: 'none',
            fontWeight: 600,
            px: 3,
            borderRadius: 2,
            transition: 'all 0.3s ease',
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          disabled={loading}
          sx={{
            background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
            boxShadow: '0 4px 20px rgba(0, 188, 212, 0.4)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(135deg, #00E5FF 0%, #00BCD4 100%)',
              boxShadow: '0 8px 30px rgba(0, 188, 212, 0.6)',
              transform: 'translateY(-2px) scale(1.02)',
            },
            '&:disabled': {
              background: 'rgba(128, 222, 234, 0.3)',
              color: 'rgba(255, 255, 255, 0.5)',
            },
            px: 4,
            py: 1,
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: 2,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {car.id ? 'Save Changes' : 'Create Car'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

