import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  addPatient,
  deletePatient,
  resetSelectedPatient,
  setSelectedPatient,
  updatePatient,
} from '../store/slices/patients/patientsSlice';

export const usePatients = () => {
  const dispatch = useDispatch();

  const { patientsList, selectedPatient, isLoading, errorMessage, successMessage } = useSelector(
    (state) => state.patients
  );

  const navigate = useNavigate();

  const onAddPatient = () => {
    navigate('/add-patient');
  };

  const onSaveNewPatient = (patientData) => {
    dispatch(addPatient(patientData));
  };

  const onEditPatient = (patient) => {
    dispatch(setSelectedPatient(patient));

    navigate(`/edit/${patient.id}`);
  };

  const onSaveEditPatient = (patientData) => {
    dispatch(updatePatient(patientData));
  };

  const onDetailsPatient = (patient) => {
    dispatch(setSelectedPatient(patient));

    navigate(`/details/${patient.id}`);
  };

  const onDeletePatient = (id) => {
    dispatch(deletePatient(id));
  };

  const onResetSelectedPatient = () => {
    dispatch(resetSelectedPatient());
  };

  return {
    patientsList,
    selectedPatient,
    isLoading,
    errorMessage,
    successMessage,
    onAddPatient,
    onSaveNewPatient,
    onEditPatient,
    onSaveEditPatient,
    onDeletePatient,
    onDetailsPatient,
    onResetSelectedPatient,
    navigate,
  };
};
