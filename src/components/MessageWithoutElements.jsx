import { Grid, Typography } from '@mui/material';
import RedoIcon from '@mui/icons-material/Redo';

export const MessageWithoutElements = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '50vh' }}
    >
      <Grid item xs={12}>
        <Typography variant="h5">Agrega un nuevo paciente</Typography>
      </Grid>

      <Grid item xs={12}>
        <RedoIcon sx={{ fontSize: '120px', color: 'primary.main' }}></RedoIcon>
      </Grid>
    </Grid>
  );
};
