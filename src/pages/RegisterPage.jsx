import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '../store/thunks/auth/registerUser';
import { AUTH_STATUS } from '../store/slices/auth/authStatus';
import { resetErrorMessage } from '../store/slices/auth/authSlice';

export const RegisterPage = () => {
  // error snackbar functionality
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenErrorSnackbar(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  // register functionality
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const isChecking = useMemo(() => status === AUTH_STATUS.CHECKING, [status]);

  useEffect(() => {
    if (errorMessage) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenErrorSnackbar(false);
    }
  }, [errorMessage]);

  const onSubmitForm = handleSubmit((data) => {
    dispatch(registerUser(data));

    reset();
  });

  // show / hide password functionality
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

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
                label="Nombre completo"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Nombre completo"
                name="fullName"
                {...register('fullName', {
                  required: {
                    value: true,
                    message: 'El nombre completo es requerido',
                  },
                  maxLength: {
                    value: 20,
                    message: 'El nombre completo no puede superar los 20 caracteres',
                  },
                  minLength: {
                    value: 3,
                    message: 'El nombre completo debe tener al menos 3 caracteres',
                  },
                })}
              />

              {errors.fullName ? (
                <Alert sx={{ marginTop: 2 }} severity="warning">
                  {errors.fullName.message}
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
                  <Button
                    onClick={() => dispatch(resetErrorMessage())}
                    variant="contained"
                    fullWidth
                  >
                    Iniciar sesión
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ order: { xs: 1, sm: 2 } }}>
                <Button type="submit" disabled={isChecking} variant="contained" fullWidth>
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
        {isChecking ? (
          <Grid container sx={{ marginTop: 2 }}>
            <CircularProgress sx={{ margin: 'auto' }} color="secondary" />
          </Grid>
        ) : null}

        <Snackbar
          open={openErrorSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseErrorSnackbar}
        >
          <Alert
            onClose={handleCloseErrorSnackbar}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Grid>
  );
};
