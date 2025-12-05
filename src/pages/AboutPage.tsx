import { Typography, Stack, Paper, Box } from '@mui/material';
import { DirectionsCar, Code, Storage, Api } from '@mui/icons-material';

export default function AboutPage() {
  return (
    <Stack spacing={3}>
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
        About
      </Typography>
      
      <Paper
        elevation={0}
        sx={{
          p: 5,
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 188, 212, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Stack spacing={4}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#00BCD4', letterSpacing: '0.5px' }}>
            Full Stack Car Database Application
          </Typography>
          
          <Typography variant="body1" sx={{ fontSize: '1.1rem', color: '#B2EBF2', lineHeight: 1.8 }}>
            A modern full-stack application built with React, TypeScript, Material-UI, and Spring Boot.
            This application demonstrates CRUD operations, RESTful API integration, and a beautiful,
            responsive user interface.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mt: 2 }}>
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              borderRadius: 3, 
              background: 'rgba(0, 188, 212, 0.1)',
              border: '1px solid rgba(0, 188, 212, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(0, 188, 212, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 188, 212, 0.3)',
              },
            }}>
              <DirectionsCar sx={{ fontSize: 48, color: '#00BCD4', mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#E0F7FA', mb: 0.5 }}>Frontend</Typography>
              <Typography variant="body2" sx={{ color: '#80DEEA' }}>React + TypeScript</Typography>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              borderRadius: 3, 
              background: 'rgba(0, 188, 212, 0.1)',
              border: '1px solid rgba(0, 188, 212, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(0, 188, 212, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 188, 212, 0.3)',
              },
            }}>
              <Code sx={{ fontSize: 48, color: '#00BCD4', mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#E0F7FA', mb: 0.5 }}>UI Framework</Typography>
              <Typography variant="body2" sx={{ color: '#80DEEA' }}>Material-UI</Typography>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              borderRadius: 3, 
              background: 'rgba(0, 188, 212, 0.1)',
              border: '1px solid rgba(0, 188, 212, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(0, 188, 212, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 188, 212, 0.3)',
              },
            }}>
              <Api sx={{ fontSize: 48, color: '#00BCD4', mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#E0F7FA', mb: 0.5 }}>Backend</Typography>
              <Typography variant="body2" sx={{ color: '#80DEEA' }}>Spring Boot</Typography>
            </Box>
            
            <Box sx={{ 
              textAlign: 'center', 
              p: 3, 
              borderRadius: 3, 
              background: 'rgba(0, 188, 212, 0.1)',
              border: '1px solid rgba(0, 188, 212, 0.3)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                background: 'rgba(0, 188, 212, 0.2)',
                boxShadow: '0 8px 25px rgba(0, 188, 212, 0.3)',
              },
            }}>
              <Storage sx={{ fontSize: 48, color: '#00BCD4', mb: 1.5 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#E0F7FA', mb: 0.5 }}>Database</Typography>
              <Typography variant="body2" sx={{ color: '#80DEEA' }}>PostgreSQL</Typography>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Stack>
  );
}

