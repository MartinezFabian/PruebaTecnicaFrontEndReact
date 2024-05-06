import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

export const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // show / hide password functionality
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // login functionality
  const onSubmitForm = handleSubmit((data) => {
    console.log(data);

    reset();
  });

  return (
    <Grid
      backgroundColor={'primary.main'}
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', padding: 4 }}
    >
      <Paper
        sx={{
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;',
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 4,
          paddingRight: 4,
          borderRadius: 3,
          width: { sm: 400, md: 500 },
        }}
      >
        <Grid container direction="column" alignItems="center" justifyContent="center" spacing={0}>
          <Typography
            component="h1"
            textTransform={'uppercase'}
            align="center"
            fontWeight={'bold'}
            variant="h5"
            sx={{ marginBottom: 2 }}
          >
            Sistema de Pacientes
          </Typography>

          <Typography component="h3" align="center" variant="h5" sx={{ marginBottom: 2 }}>
            Iniciar Sesión
          </Typography>
        </Grid>

        <form onSubmit={onSubmitForm}>
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                label="Nombre de usuario"
                type="text"
                autoComplete="username"
                variant="outlined"
                fullWidth
                placeholder="Nombre de usuario"
                name="username"
                {...register('username', {
                  required: { value: true, message: 'El nombre de usuario es requerido' },
                })}
              />
              {errors.username ? (
                <Alert sx={{ marginTop: 2 }} severity="warning">
                  {errors.username.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Contraseña</InputLabel>
                <OutlinedInput
                  label="Contraseña"
                  placeholder="Contraseña"
                  id="outlined-adornment-password"
                  variant="outlined"
                  autoComplete="current-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  {...register('password', {
                    required: { value: true, message: 'La contraseña es requerida' },
                  })}
                  inputProps={{
                    'aria-label': 'password-input',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {errors.password ? (
                <Alert sx={{ marginTop: 2 }} severity="warning">
                  {errors.password.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 2 }}>
              <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 1 } }}>
                <Link to="/register">
                  <Button variant="contained" fullWidth>
                    Registrarte
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ order: { xs: 1, sm: 2 } }}>
                <Button type="submit" variant="contained" fullWidth>
                  Ingresar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
