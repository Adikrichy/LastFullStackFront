import { AppBar, Toolbar, Typography, Container, Button, Box } from '@mui/material';
import { Link, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { DirectionsCar, Logout } from '@mui/icons-material';
import { useAuth } from './contexts/AuthContext';
import CarsPage from './pages/CarsPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

export default function App() {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {!isAuthPage && (
        <AppBar 
          position="static" 
          elevation={0}
          sx={{ 
            background: 'rgba(10, 14, 39, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0, 188, 212, 0.3)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <Toolbar sx={{ gap: 2, py: 1 }}>
            <Box
              component={Link}
              to="/cars"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 45,
                height: 45,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
                mr: 1,
                boxShadow: '0 4px 15px rgba(0, 188, 212, 0.4)',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'scale(1.1) rotate(5deg)',
                  boxShadow: '0 6px 20px rgba(0, 188, 212, 0.6)',
                },
              }}
            >
              <DirectionsCar sx={{ fontSize: 26, color: 'white' }} />
            </Box>
            <Typography 
              component={Link}
              to="/cars"
              variant="h5" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 800,
                letterSpacing: '1px',
                background: 'linear-gradient(135deg, #00BCD4 0%, #00E5FF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  filter: 'brightness(1.2)',
                },
              }}
            >
              Car Database
            </Typography>
            {isAuthenticated ? (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/cars"
                  sx={{
                    color: '#E0F7FA',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 188, 212, 0.15)',
                      color: '#00BCD4',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Cars
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/about"
                  sx={{
                    color: '#E0F7FA',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 188, 212, 0.15)',
                      color: '#00BCD4',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  About
                </Button>
                <Button 
                  color="inherit" 
                  onClick={handleLogout}
                  startIcon={<Logout />}
                  sx={{
                    color: '#E0F7FA',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 87, 34, 0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255, 87, 34, 0.15)',
                      color: '#FF5722',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/login"
                  sx={{
                    color: '#E0F7FA',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.2), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 188, 212, 0.15)',
                      color: '#00BCD4',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Войти
                </Button>
                <Button 
                  color="inherit" 
                  component={Link} 
                  to="/register"
                  variant="outlined"
                  sx={{
                    color: '#00BCD4',
                    borderColor: 'rgba(0, 188, 212, 0.5)',
                    fontWeight: 600,
                    px: 2.5,
                    py: 1,
                    borderRadius: 2,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(0, 188, 212, 0.3), transparent)',
                      transition: 'left 0.5s',
                    },
                    '&:hover::before': {
                      left: '100%',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(0, 188, 212, 0.1)',
                      borderColor: '#00BCD4',
                      color: '#00E5FF',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0, 188, 212, 0.3)',
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  Регистрация
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      )}

      <Box sx={{ py: isAuthPage ? 0 : 4, minHeight: isAuthPage ? '100vh' : 'calc(100vh - 64px)' }}>
        {isAuthPage ? (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        ) : (
          <Container maxWidth="lg">
            <Routes>
              <Route path="/" element={<Navigate to={isAuthenticated ? "/cars" : "/login"} replace />} />
              <Route path="/cars" element={isAuthenticated ? <CarsPage /> : <Navigate to="/login" replace />} />
              <Route path="/about" element={isAuthenticated ? <AboutPage /> : <Navigate to="/login" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Container>
        )}
      </Box>
    </>
  );
}

