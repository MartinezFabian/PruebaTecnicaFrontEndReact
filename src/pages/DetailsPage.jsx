import { Button, Grid, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export const DetailsPage = () => {
  const patient = {
    id: 1,
    fullName: 'Fabian Martinez',
    dateOfBirth: '2001-05-24',
    allergies: '',
    locality: 'Chaco',
  };

  return (
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
            secondary={patient.fullName}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Fecha de nacimiento"
            secondary={patient.dateOfBirth}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Edad"
            secondary="22"
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Localidad"
            secondary={patient.locality}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Alergias"
            secondary={patient.allergies ? patient.allergies : 'Ninguna'}
            primaryTypographyProps={{ style: { fontSize: '20px' } }}
            secondaryTypographyProps={{ style: { fontSize: '16px' } }}
          />
        </ListItem>

        <Link to="/">
          <Button
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
