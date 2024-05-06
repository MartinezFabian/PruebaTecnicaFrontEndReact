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

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // show / hide password functionality
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // register functionality
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
            Registro
          </Typography>
        </Grid>

        <form onSubmit={onSubmitForm}>
          <Grid container>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                label="Nombre"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Nombre"
                name="name"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'El nombre es requerido',
                  },
                  maxLength: {
                    value: 20,
                    message: 'El nombre no puede superar los 20 caracteres',
                  },
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener al menos 3 caracteres',
                  },
                })}
              />

              {errors.name ? (
                <Alert sx={{ marginTop: 2 }} severity="warning">
                  {errors.name.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                label="Apellido"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Apellido"
                name="lastname"
                {...register('lastname', {
                  required: {
                    value: true,
                    message: 'El apellido es requerido',
                  },
                  maxLength: {
                    value: 20,
                    message: 'El apellido no puede superar los 20 caracteres',
                  },
                  minLength: {
                    value: 3,
                    message: 'El apellido debe tener al menos 3 caracteres',
                  },
                })}
              />

              {errors.lastname ? (
                <Alert sx={{ marginTop: 2 }} severity="warning">
                  {errors.lastname.message}
                </Alert>
              ) : null}
            </Grid>

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
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres',
                    },
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

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password2">Repetir Contraseña</InputLabel>
                <OutlinedInput
                  label="Repetir Contraseña"
                  placeholder="Repetir Contraseña"
                  id="outlined-adornment-password2"
                  variant="outlined"
                  autoComplete="current-password"
                  type={showRepeatPassword ? 'text' : 'password'}
                  name="passwordRepeat"
                  {...register('passwordRepeat', {
                    required: { value: true, message: 'Confirmar la contraseña es requerido' },
                    validate: (value) =>
                      value === watch('password') ? true : 'Las contraseñas no coinciden',
                  })}
                  inputProps={{
                    'aria-label': 'password-input',
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRepeatPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>

              {errors.passwordRepeat ? (
                <Alert sx={{ marginTop: 2 }} severity="warning">
                  {errors.passwordRepeat.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid container spacing={2} sx={{ marginBottom: 2, marginTop: 2 }}>
              <Grid item xs={12} sm={6} sx={{ order: { xs: 2, sm: 1 } }}>
                <Link to="/login">
                  <Button variant="contained" fullWidth>
                    Iniciar sesión
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ order: { xs: 1, sm: 2 } }}>
                <Button type="submit" variant="contained" fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};
