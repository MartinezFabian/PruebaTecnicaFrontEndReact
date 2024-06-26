import { useEffect, useMemo, useState } from 'react';

import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  TablePagination,
  TextField,
  Typography,
  InputAdornment,
  Snackbar,
} from '@mui/material';

import AlertDialog from '../components/AlertDialog';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

import moment from 'moment';
import { usePatients } from '../hooks/usePatients';
import { MessageWithoutElements } from '../components/MessageWithoutElements';
import { useSnackbar } from '../hooks/useSnackbar';

export const HomePage = () => {
  const {
    openSuccessSnackbar,
    setOpenSuccessSnackbar,
    handleCloseSuccessSnackbar,
    openErrorSnackbar,
    setOpenErrorSnackbar,
    handleCloseErrorSnackbar,
  } = useSnackbar();

  const {
    patientsList,
    isLoading,
    errorMessage,
    successMessage,
    onAddPatient,
    onEditPatient,
    onDeletePatient,
    onDetailsPatient,
  } = usePatients();

  //  patient list filter functionalities
  const [searchValue, setSearchValue] = useState('');

  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  let filteredPatientsList = useMemo(() => {
    return patientsList
      .filter((patient) => {
        return patient.fullName.toLowerCase().includes(searchValue.toLowerCase());
      })
      .sort((a, b) => {
        // Convert fullNames to lowercase
        const fullNameA = a.fullName.toLowerCase();
        const fullNameB = b.fullName.toLowerCase();

        // Sort alphabetically using localeCompare
        return fullNameA.localeCompare(fullNameB);
      });
  }, [patientsList, searchValue]);

  const [showDialog, setShowDialog] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const onStartPatientElimination = (id) => {
    setIdToDelete(id);
    setShowDialog(true);
  };

  const onConfirmDeleteDialog = () => {
    onDeletePatient(idToDelete);
    setOpenSuccessSnackbar(true);
  };

  const onCloseDeleteDialog = () => {
    setShowDialog(false);
    setIdToDelete(null);
  };

  useEffect(() => {
    if (errorMessage) {
      setOpenErrorSnackbar(true);
    } else {
      setOpenErrorSnackbar(false);
    }
  }, [errorMessage]);

  /* columns format */

  const columns = [
    { id: 'fullName', label: 'Apellido y Nombre', minWidth: 100 },
    {
      id: 'dateOfBirth',
      label: 'Fecha de nacimiento',

      format: (value) => {
        return moment.utc(value).format('DD/MM/YYYY');
      },
    },
    {
      id: 'allergies',
      label: 'Alergias',
      minWidth: 100,
      maxWidth: 120,

      format: (value) => (value.length > 0 ? value : 'Ninguna'),
    },
    {
      id: 'locality',
      label: 'Localidad',
      minWidth: 100,
    },
    {
      id: 'actions',
      label: 'Acciones',
      minWidth: 100,
      maxWidth: 200,
      format: (value, row) => (
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
          flexWrap="nowrap"
          overflow="auto"
        >
          <Button
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<ArrowForwardIcon></ArrowForwardIcon>}
            onClick={() => onDetailsPatient(row)}
          >
            Detalles
          </Button>

          <Button
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<EditIcon></EditIcon>}
            onClick={() => onEditPatient(row)}
          >
            Editar
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={() => onStartPatientElimination(row.id)}
          >
            Eliminar
          </Button>
        </Grid>
      ),
    },
  ];

  /* pagination */

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      gap={6}
      sx={{ minHeight: '100vh' }}
    >
      <Grid container gap={4} sx={{ maxWidth: '900px' }}>
        <Typography variant="h4">Lista de pacientes</Typography>

        <TextField
          type="search"
          value={searchValue}
          onChange={onSearchValueChange}
          label="Buscar paciente por nombre"
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {errorMessage ? (
        <Alert severity="error">{errorMessage}</Alert>
      ) : filteredPatientsList.length === 0 ? (
        <MessageWithoutElements></MessageWithoutElements>
      ) : isLoading ? (
        <CircularProgress sx={{ margin: 'auto' }} color="primary" />
      ) : (
        <Paper sx={{ maxWidth: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ minWidth: '100%', maxHeight: 440, overflowX: 'auto' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, maxWidth: column.maxWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatientsList
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          bgcolor: row.allergies.length > 0 ? 'rgb(251 226 172)' : 'inherit',
                          '&:hover': {
                            bgcolor:
                              row.allergies.length > 0 ? 'rgb(251 226 172) !important' : 'inherit',
                          },
                        }}
                      >
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {column.format ? column.format(row[column.id], row) : row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={filteredPatientsList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage="Filas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
          />
        </Paper>
      )}

      <Fab
        variant="extended"
        size="medium"
        onClick={onAddPatient}
        sx={{ position: 'fixed', bottom: 40, right: 40 }}
        color="primary"
        aria-label="add"
      >
        <AddIcon sx={{ mr: 1 }}></AddIcon>
        Agregar paciente
      </Fab>

      <AlertDialog
        open={showDialog}
        title="¿Estas seguro de eliminar al paciente?"
        description="Si eliminas al paciente, no podrás recuperar los datos. Y perderás toda su información asociada."
        onClose={onCloseDeleteDialog}
        onConfirm={onConfirmDeleteDialog}
      />

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

      <Snackbar open={openErrorSnackbar} autoHideDuration={6000} onClose={handleCloseErrorSnackbar}>
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
  );
};
