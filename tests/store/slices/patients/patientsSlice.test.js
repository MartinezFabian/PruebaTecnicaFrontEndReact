import {
  addPatient,
  deletePatient,
  fetchPatientsFailure,
  fetchPatientsRequest,
  fetchPatientsSuccess,
  patientsSlice,
  resetSelectedPatient,
  setSelectedPatient,
  updatePatient,
} from '../../../../src/store/slices/patients/patientsSlice';
import {
  initialSelectedPatientTest,
  patientTest,
  patientUpdatedTest,
  patientsInitialStateTest,
  patientsListTest,
  patientsStateTest,
  selectedPatientTest,
} from '../../../fixtures/patientsFixtures';

// NOTE: The test data used in this file are in "tests/fixtures/patientsFixtures.js"

/* eslint-disable no-undef */
describe('tests in patientsSlice.js', () => {
  test('must have the correct initial state', () => {
    // ensure that the correct slice is accessed
    expect(patientsSlice.name).toBe('patients');

    // ensure that the correct initial state is returned
    expect(patientsSlice.getInitialState(patientsInitialStateTest));
  });

  test('must set isLoading to true and errorMessage to null', () => {
    // this simulates the fetchPatientsRequest action
    const state = patientsSlice.reducer(patientsInitialStateTest, fetchPatientsRequest());

    // it is verified that the resulting state after the fetchPatientsRequest action is equal to the expected state
    expect(state.isLoading).toBe(true);
    expect(state.errorMessage).toBe(null);
  });

  test('must set the patientsList and isLoading to false and errorMessage to null', () => {
    // this simulates the fetchPatientsSuccess action with the patients list provided
    const state = patientsSlice.reducer(
      patientsInitialStateTest,
      fetchPatientsSuccess(patientsListTest)
    );

    // it is verified that the resulting state after the fetchPatientsSuccess action is equal to the expected state
    expect(state.patientsList).toEqual(patientsListTest);
    expect(state.isLoading).toBe(false);
    expect(state.errorMessage).toBe(null);
  });

  test('must set the correct error message and set the isLoading to false', () => {
    const errorMessage =
      'Se produjo un error al cargar los datos de los pacientes. Por favor, inténtelo de nuevo.';

    // this simulates the fetchPatientsFailure action with an error message
    const state = patientsSlice.reducer(
      patientsInitialStateTest,
      fetchPatientsFailure(errorMessage)
    );

    // it is verified that the resulting state after the fetchPatientsFailure action is equal to the expected state
    expect(state.errorMessage).toBe(errorMessage);
    expect(state.isLoading).toBe(false);
  });

  test('must add a new patient', () => {
    // this simulates the addPatient action with the patient data provided
    const state = patientsSlice.reducer(patientsStateTest, addPatient(patientTest));

    // it is verified that the resulting state after the addPatient action is equal to the expected state

    // the patientsList must contain the new patient
    expect(state.patientsList).toHaveLength(3);
    expect(state.patientsList[2]).toEqual(patientTest);
    // the successMessage must be set to the correct message
    expect(state.successMessage).toBe('Paciente agregado correctamente');
  });

  test('must update an existing patient', () => {
    // this simulates the updatePatient action with the patient updated data provided
    const state = patientsSlice.reducer(patientsStateTest, updatePatient(patientUpdatedTest));

    // it is verified that the resulting state after the updatePatient action is equal to the expected state
    expect(state.patientsList[0]).toEqual(patientUpdatedTest);
    expect(state.successMessage).toBe('Paciente actualizado correctamente');
    expect(state.errorMessage).toBe(null);
  });

  test('must delete an existing patient by id', () => {
    // this simulates the deletePatient action with the id of the patient to be deleted
    const state = patientsSlice.reducer(patientsStateTest, deletePatient('1'));

    // it is verified that the resulting state after the deletePatient action is equal to the expected state
    expect(state.patientsList).toHaveLength(1);
    expect(state.successMessage).toBe('Paciente eliminado correctamente');
    expect(state.errorMessage).toBe(null);
  });

  test('must set the selected patient', () => {
    // this simulates the setSelectedPatient action with the selected patient data provided
    const state = patientsSlice.reducer(patientsStateTest, setSelectedPatient(selectedPatientTest));

    // it is verified that the resulting state after the setSelectedPatient action is equal to the expected state
    expect(state.selectedPatient).toEqual(selectedPatientTest);
    expect(state.errorMessage).toBe(null);
  });

  test('must reset the selected patient', () => {
    // this simulates the resetSelectedPatient action
    const state = patientsSlice.reducer(patientsStateTest, resetSelectedPatient());

    // it is verified that the resulting state after the resetSelectedPatient action is equal to the expected state
    expect(state.selectedPatient).toEqual(initialSelectedPatientTest);
    expect(state.errorMessage).toBe(null);
  });
});
