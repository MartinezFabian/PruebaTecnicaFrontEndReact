import {
  fetchPatientsFailure,
  fetchPatientsRequest,
  fetchPatientsSuccess,
} from '../../slices/patients/patientsSlice';

export const fetchPatients = () => {
  return async (dispatch, getState) => {
    const url = 'src/patients.json';

    try {
      dispatch(fetchPatientsRequest());

      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();

        dispatch(fetchPatientsSuccess(data));
      } else {
        dispatch(fetchPatientsFailure(response.statusText));
      }
    } catch (error) {
      dispatch(fetchPatientsFailure('No se pudo realizar la petición: ' + error));
    }
  };
};
