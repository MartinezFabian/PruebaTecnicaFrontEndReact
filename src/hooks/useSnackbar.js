import { useState } from 'react';

export const useSnackbar = () => {
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccessSnackbar(false);
  };

  const handleCloseErrorSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErrorSnackbar(false);
  };

  return {
    openSuccessSnackbar,
    setOpenSuccessSnackbar,
    handleCloseSuccessSnackbar,
    openErrorSnackbar,
    setOpenErrorSnackbar,
    handleCloseErrorSnackbar,
  };
};
