import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { Alert, Button, Grid, InputLabel, Snackbar, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { usePatients } from '../hooks/usePatients';
import { useSnackbar } from '../hooks/useSnackbar';

export const AddPatient = () => {
  const {
    openSuccessSnackbar,
    setOpenSuccessSnackbar,
    handleCloseSuccessSnackbar,
    openErrorSnackbar,
    setOpenErrorSnackbar,
    handleCloseErrorSnackbar,
  } = useSnackbar();

  // add patient functionality

  const { patientsList, errorMessage, successMessage, onSaveNewPatient } = usePatients();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onFormSubmit = handleSubmit((data) => {
    onSaveNewPatient({ id: patientsList.length + 1, ...data });

    setOpenSuccessSnackbar(true);
    reset();
  });

  useEffect(() => {
    if (errorMessage) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenErrorSnackbar(false);
    }
  }, [errorMessage]);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ paddingTop: 4 }}
    >
      <Grid container sx={{ borderRadius: 2, width: { sm: 400, md: 500 } }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Agregar un nuevo Paciente
        </Typography>

        <form onSubmit={onFormSubmit}>
          <Grid container gap={2}>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                label="Apellido y Nombre"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Apellido y Nombre"
                name="fullName"
                {...register('fullName', {
                  required: {
                    value: true,
                    message: 'Debes ingresar el apellido y nombre del paciente',
                  },
                  maxLength: {
                    value: 50,
                    message: 'El apellido y nombre del paciente no debe superar los 50 caracteres',
                  },
                })}
              />

              {errors.fullName ? (
                <Alert severity="warning" sx={{ marginTop: 2 }}>
                  {errors.fullName.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <InputLabel htmlFor="date-of-birth">Fecha de nacimiento</InputLabel>
              <TextField
                id="date-of-birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dateOfBirth"
                {...register('dateOfBirth', {
                  required: {
                    value: true,
                    message: 'Debe seleccionar una fecha de nacimiento del paciente',
                  },
                  validate: (value) => {
                    const dateOfBirth = new Date(value + 'T00:00:00-03:00');
                    const currentDate = new Date();

                    return dateOfBirth < currentDate
                      ? true
                      : 'La fecha de nacimiento no puede ser posterior a la fecha actual';
                  },
                })}
              />

              {errors.dateOfBirth ? (
                <Alert severity="warning" sx={{ marginTop: 2 }}>
                  {errors.dateOfBirth.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                label="Opcional - Alergias"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Ej. Penicilina, Polen"
                name="allergies"
                {...register('allergies', {
                  maxLength: {
                    value: 55,
                    message: 'Las alergías no deben superar los 55 caracteres',
                  },
                })}
              />

              {errors.allergies ? (
                <Alert severity="warning" sx={{ marginTop: 2 }}>
                  {errors.allergies.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                label="Localidad"
                type="text"
                variant="outlined"
                fullWidth
                placeholder="Ej. Resistencia, Chaco"
                name="locality"
                {...register('locality', {
                  required: {
                    value: true,
                    message: 'Debes ingresar la localidad del paciente',
                  },
                  maxLength: {
                    value: 50,
                    message: 'La localidad no debe superar los 50 caracteres',
                  },
                })}
              />

              {errors.locality ? (
                <Alert severity="warning" sx={{ marginTop: 2 }}>
                  {errors.locality.message}
                </Alert>
              ) : null}
            </Grid>

            <Grid item sx={{ marginBottom: 2, marginTop: 2 }}>
              <Link to="/">
                <Button
                  size="medium"
                  color="secondary"
                  variant="contained"
                  xs={12}
                  sm={6}
                  sx={{ marginRight: 2 }}
                >
                  Volver
                </Button>
              </Link>

              <Button
                type="submit"
                size="medium"
                color="secondary"
                variant="contained"
                xs={12}
                sm={6}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSuccessSnackbar}
        >
          <Alert
            onClose={handleCloseSuccessSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            {successMessage}
          </Alert>
        </Snackbar>

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
      </Grid>
    </Grid>
  );
};
