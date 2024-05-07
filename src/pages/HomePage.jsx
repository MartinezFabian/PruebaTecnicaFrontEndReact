import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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
} from '@mui/material';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  /* navigation's */

  const navigate = useNavigate();

  const onAddPatient = () => {
    navigate('/add-patient');
  };

  const onEditPatient = (objectId) => {
    navigate(`/edit/${objectId}`);
  };

  const onDetailsPatient = (objectId) => {
    navigate(`/details/${objectId}`);
  };

  /* columns format */

  const columns = [
    { id: 'fullName', label: 'Apellido y Nombre', minWidth: 100 },
    {
      id: 'dateOfBirth',
      label: 'Fecha de nacimiento',
    },
    {
      id: 'allergies',
      label: 'Alergias',
      minWidth: 100,
      maxWidth: 120,
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
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<ArrowForwardIcon></ArrowForwardIcon>}
            onClick={() => onDetailsPatient(row.id)}
          >
            Detalles
          </Button>

          <Button
            variant="outlined"
            size="small"
            color="primary"
            startIcon={<EditIcon></EditIcon>}
            onClick={() => onEditPatient(row.id)}
          >
            Editar
          </Button>

          <Button
            variant="contained"
            size="small"
            color="error"
            startIcon={<DeleteIcon></DeleteIcon>}
            onClick={() => console.log(row.id)}
          >
            Eliminar
          </Button>
        </Grid>
      ),
    },
  ];

  /* test data */
  const rows = [
    {
      id: 1,
      fullName: 'Fabian Martinez',
      dateOfBirth: '24/05/2001',
      allergies: 'Ninguna',
      locality: 'Chaco',
    },
    {
      id: 2,
      fullName: 'Alvarez Juan Carlos',
      dateOfBirth: '09/04/2000',
      allergies: 'Penicilina, Polen',
      locality: 'Santo Tome',
    },
    {
      id: 3,
      fullName: 'Montero Juan',
      dateOfBirth: '09/04/2000',
      allergies: 'Ninguna',
      locality: 'Corrientes',
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

      {rows.length === 0 ? (
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '94vh' }}
        >
          <Grid item xs={12}>
            <Typography variant="h5">Agrega un nuevo paciente</Typography>
          </Grid>

          <Grid item xs={12}>
            <RedoIcon sx={{ fontSize: '120px', color: 'primary.main' }}></RedoIcon>
          </Grid>
        </Grid>
      ) : error ? (
        <Alert severity="error">Error</Alert>
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
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {column.format ? column.format(row[column.id], row) : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25]}
            component="div"
            count={rows.length}
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
    </Grid>
  );
};
