import { Typography, Stack, Paper, Button, Box } from '@mui/material';
import { Home, ErrorOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <Stack spacing={3} alignItems="center" sx={{ minHeight: '60vh', justifyContent: 'center' }}>
      <Paper
        elevation={0}
        sx={{
          p: 6,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 188, 212, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          textAlign: 'center',
          maxWidth: 500,
        }}
      >
        <ErrorOutline sx={{ fontSize: 100, color: '#00BCD4', mb: 2, filter: 'drop-shadow(0 0 20px rgba(0, 188, 212, 0.5))' }} />
        <Typography 
          variant="h1" 
          sx={{ 
            fontWeight: 900,
            fontSize: '7rem',
            background: 'linear-gradient(135deg, #00BCD4 0%, #00E5FF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            mb: 2,
            textShadow: '0 0 30px rgba(0, 188, 212, 0.5)',
          }}
        >
          404
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#E0F7FA', letterSpacing: '0.5px' }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: '#B2EBF2', mb: 4, fontSize: '1.1rem' }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          component={Link}
          to="/cars"
          variant="contained"
          startIcon={<Home />}
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
          Go Home
        </Button>
      </Paper>
    </Stack>
  );
}

