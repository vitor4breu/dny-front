import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Box, InputAdornment, IconButton } from '@mui/material';
import DnyLogoIcon from '../../../assets/dny-logo-extended.svg';
import './style.css';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../auth/authContext';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = React.useState(false);

  const [error, setError] = useState<string | null>(null);

  const {login} = useAuth();

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/'); // Redireciona para a página inicial
    } else {
      setError('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height:"100vh",
        }}
      >
        <img src={DnyLogoIcon} alt='Logo DNY extendida' className='logo-login-form'/>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width:"100%"}}>
          <div className='login-form-label'>Usuário</div>
          <TextField
          className="login-form-input"
            margin="normal"
            required
            fullWidth
            id="usuario"
            name="usuario"
            autoComplete="username"
            placeholder="Digite seu usuário"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className='login-form-label'>Senha</div>
          <TextField
          className="login-form-input"
            margin="normal"
            required
            fullWidth
            name="senha"
            type={ showPassword ? "text" : "password"}
            id="senha"
            autoComplete="password"
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={
              {
                endAdornment: 
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={e => e.preventDefault()}
                      onMouseUp={e => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
              }
            }

            
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3, mb: 2 }}
            className="login-form-submit-button"
          >
            Login
          </Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;