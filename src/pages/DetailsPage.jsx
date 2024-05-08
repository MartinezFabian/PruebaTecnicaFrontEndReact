import { Alert, Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetSelectedPatient } from '../store/slices/patients/patientsSlice';
import moment from 'moment';
import { calculateAge } from '../utils/calculateAge';

export const DetailsPage = () => {
  const dispatch = useDispatch();
  const { selectedPatient, errorMessage } = useSelector((state) => state.patients);

  return errorMessage ? (
    <Alert severity="error">{errorMessage}</Alert>
  ) : (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ paddingTop: 4 }}
    >
      <List
        sx={{
          paddingLeft: 4,
          paddingRight: 8,
          paddingTop: 4,
          paddingBottom: 4,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <ListItem>
          <ListItemText
            primary="Apellido y Nombre"
            secondary={selectedPatient.fullName}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha de nacimiento"
            secondary={moment.utc(selectedPatient.dateOfBirth).format('DD/MM/YYYY')}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Edad"
            secondary={calculateAge(selectedPatient.dateOfBirth)}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Localidad"
            secondary={selectedPatient.locality}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Alergias"
            secondary={selectedPatient.allergies ? selectedPatient.allergies : 'Ninguna'}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>

        <Link to="/">
          <Button
            onClick={() => dispatch(resetSelectedPatient())}
            size="medium"
            color="secondary"
            variant="contained"
            xs={12}
            sm={6}
            sx={{ marginLeft: 2, marginTop: 2 }}
          >
            Volver
          </Button>
        </Link>
      </List>
    </Grid>
  );
};
