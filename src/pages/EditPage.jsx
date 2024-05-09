import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Button, Grid, InputLabel, Snackbar, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { usePatients } from '../hooks/usePatients';
import { useSnackbar } from '../hooks/useSnackbar';
import { initialSelectedPatient } from '../store/slices/patients/patientsSlice';

export const EditPage = () => {
  const {
    openSuccessSnackbar,
    setOpenSuccessSnackbar,
    handleCloseSuccessSnackbar,
    openErrorSnackbar,
    setOpenErrorSnackbar,
    handleCloseErrorSnackbar,
  } = useSnackbar();

  // edit patient functionality

  const {
    selectedPatient,
    errorMessage,
    successMessage,
    onSaveEditPatient,
    onResetSelectedPatient,
    navigate,
  } = usePatients();

  // if no patient is selected, redirect to HomePage
  useEffect(() => {
    if (selectedPatient === initialSelectedPatient) {
      navigate('/');
    }
  }, [selectedPatient]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onFormSubmit = handleSubmit((data) => {
    onSaveEditPatient({ id: selectedPatient.id, ...data });

    setOpenSuccessSnackbar(true);
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
          Editar Paciente
        </Typography>

        <form onSubmit={onFormSubmit}>
          <Grid container gap={2}>
            <Grid item xs={12} sx={{ marginTop: 2 }}>
              <TextField
                defaultValue={selectedPatient.fullName}
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
                defaultValue={selectedPatient.dateOfBirth}
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
                defaultValue={selectedPatient.allergies}
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
                defaultValue={selectedPatient.locality}
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
                  onClick={() => onResetSelectedPatient()}
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
                Guardar
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
