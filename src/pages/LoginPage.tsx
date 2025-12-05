import { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  InputAdornment,
  Fade,
} from '@mui/material';
import { Person, Lock, Login as LoginIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { axiosClient } from '../api/axiosClient';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axiosClient.post<{ token: string }>('/auth/login', {
        username,
        password,
      });
      login(response.data.token);
      navigate('/cars');
    } catch (err: any) {
      setError(err.message || 'Ошибка входа. Проверьте данные.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0f1419 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(0, 188, 212, 0.15) 0%, transparent 70%)',
          top: '-250px',
          left: '-250px',
          animation: 'float 20s ease-in-out infinite',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 150, 167, 0.1) 0%, transparent 70%)',
          bottom: '-200px',
          right: '-200px',
          animation: 'float 15s ease-in-out infinite reverse',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translate(0, 0) rotate(0deg)',
          },
          '50%': {
            transform: 'translate(30px, 30px) rotate(180deg)',
          },
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 5 },
              width: '100%',
              background: 'linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(0, 150, 167, 0.15) 100%)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(0, 188, 212, 0.3)',
              borderRadius: 4,
              boxShadow: '0 20px 60px rgba(0, 188, 212, 0.2), 0 0 40px rgba(0, 150, 167, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: 'linear-gradient(90deg, #00BCD4, #00E5FF, #00BCD4)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s linear infinite',
              },
              '@keyframes shimmer': {
                '0%': {
                  backgroundPosition: '-200% 0',
                },
                '100%': {
                  backgroundPosition: '200% 0',
                },
              },
            }}
          >
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
                  mb: 2,
                  boxShadow: '0 8px 32px rgba(0, 188, 212, 0.4)',
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': {
                      transform: 'scale(1)',
                      boxShadow: '0 8px 32px rgba(0, 188, 212, 0.4)',
                    },
                    '50%': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 12px 40px rgba(0, 188, 212, 0.6)',
                    },
                  },
                }}
              >
                <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, #00BCD4 0%, #00E5FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  mb: 1,
                  letterSpacing: '1px',
                }}
              >
                Добро пожаловать
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'rgba(224, 247, 250, 0.7)',
                  fontSize: '0.95rem',
                }}
              >
                Войдите в свой аккаунт
              </Typography>
            </Box>

            {error && (
              <Fade in>
                <Alert
                  severity="error"
                  sx={{
                    mb: 3,
                    background: 'rgba(211, 47, 47, 0.1)',
                    border: '1px solid rgba(211, 47, 47, 0.3)',
                    color: '#ff6b6b',
                    '& .MuiAlert-icon': {
                      color: '#ff6b6b',
                    },
                  }}
                >
                  {error}
                </Alert>
              </Fade>
            )}

            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Имя пользователя"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: '#00BCD4' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(10, 14, 39, 0.5)',
                    color: '#E0F7FA',
                    '& fieldset': {
                      borderColor: 'rgba(0, 188, 212, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 188, 212, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00BCD4',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(224, 247, 250, 0.7)',
                    '&.Mui-focused': {
                      color: '#00BCD4',
                    },
                  },
                }}
              />
              <TextField
                fullWidth
                label="Пароль"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: '#00BCD4' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  mb: 4,
                  '& .MuiOutlinedInput-root': {
                    background: 'rgba(10, 14, 39, 0.5)',
                    color: '#E0F7FA',
                    '& fieldset': {
                      borderColor: 'rgba(0, 188, 212, 0.3)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0, 188, 212, 0.5)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#00BCD4',
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: 'rgba(224, 247, 250, 0.7)',
                    '&.Mui-focused': {
                      color: '#00BCD4',
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                startIcon={!loading && <LoginIcon />}
                sx={{
                  py: 1.8,
                  mb: 3,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #00BCD4 0%, #0097A7 100%)',
                  boxShadow: '0 8px 24px rgba(0, 188, 212, 0.4)',
                  textTransform: 'none',
                  borderRadius: 2,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #0097A7 0%, #00BCD4 100%)',
                    boxShadow: '0 12px 32px rgba(0, 188, 212, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&.Mui-disabled': {
                    background: 'rgba(0, 188, 212, 0.3)',
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                {loading ? 'Вход...' : 'Войти'}
              </Button>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(224, 247, 250, 0.7)',
                    fontSize: '0.9rem',
                  }}
                >
                  Нет аккаунта?{' '}
                  <Link
                    component="button"
                    type="button"
                    onClick={() => navigate('/register')}
                    sx={{
                      color: '#00BCD4',
                      textDecoration: 'none',
                      fontWeight: 600,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: '-2px',
                        left: 0,
                        width: '0%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #00BCD4, #00E5FF)',
                        transition: 'width 0.3s ease',
                      },
                      '&:hover::after': {
                        width: '100%',
                      },
                      '&:hover': {
                        color: '#00E5FF',
                      },
                    }}
                  >
                    Зарегистрироваться
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
}

