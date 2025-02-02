import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Container, Box, TextField, IconButton, Button } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import DnyLogoIconExtended from '@assets/dny-logo-extended.svg';
import { useState } from 'react';
import "./style.css";
import { useAuth } from '@utils/auth/authContext';

interface LoginCredentials {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginCredentials>({ username: '', password: '' });
  const [formErrors, setFormErrors] = useState<Partial<LoginCredentials>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const auth = useAuth();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => 
      await auth.login(credentials.username, credentials.password),
    onSuccess: (success : any) => {
      if (success) {
        navigate('/');
      }
    },
    onError: (error: any) => {
      console.error(error.message);
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;
    const errors: Partial<LoginCredentials> = {};

    if (!formValues.username.trim()) {
      errors.username = 'Usuário é obrigatório';
      valid = false;
    }

    if (!formValues.password.trim()) {
      errors.password = 'Senha é obrigatória';
      valid = false;
    }

    setFormErrors(errors);

    if (valid) {
      loginMutation.mutate(formValues);
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
          height: "100vh",
        }}
      >
        <img src={DnyLogoIconExtended} alt='Logo DNY extendida' className='logo-login-form'/>
        <Box component="form" onSubmit={handleSubmit} sx={{width: "100%" }}>
          <div className='login-form-label'>Usuário</div>
          <TextField
            className="login-form-input"
            fullWidth
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            disabled={loginMutation.isPending}
            error={!!formErrors.username}
            helperText={formErrors.username}
          />
          
          <div className='login-form-label'>Senha</div>
          <TextField
            className="login-form-input"
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={formValues.password}
            onChange={handleChange}
            disabled={loginMutation.isPending}
            error={!!formErrors.password}
            helperText={formErrors.password}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              )
            }}
          />

          {loginMutation.isError && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {loginMutation.error.message}
            </div>
          )}

          <Button
            className="login-form-button"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? 'Entrando...' : 'Entrar'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;