import { createSlice } from '@reduxjs/toolkit';

export const initialSelectedPatient = {
  fullName: '',
  dateOfBirth: new Date().toISOString().split('T')[0],
  allergies: '',
  locality: '',
};

const initialState = {
  patientsList: [],
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  selectedPatient: initialSelectedPatient,
};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsRequest: (state) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.isLoading = false;
      state.patientsList = action.payload;
      state.errorMessage = null;
    },
    fetchPatientsFailure: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload;
    },
    addPatient: (state, action) => {
      state.patientsList.push(action.payload);
      state.errorMessage = null;
      state.successMessage = 'Paciente agregado correctamente';
    },
    updatePatient: (state, action) => {
      state.patientsList = state.patientsList.map((patient) => {
        if (patient.id === action.payload.id) {
          return action.payload;
        }

        return patient;
      });

      state.successMessage = 'Paciente actualizado correctamente';
      state.errorMessage = null;
    },

    deletePatient: (state, action) => {
      state.patientsList = state.patientsList.filter((patient) => patient.id !== action.payload);

      state.successMessage = 'Paciente eliminado correctamente';
      state.error = null;
    },

    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;

      state.errorMessage = null;
    },

    resetSelectedPatient: (state) => {
      state.selectedPatient = initialSelectedPatient;

      state.errorMessage = null;
    },
  },
});

export const {
  fetchPatientsRequest,
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  resetSelectedPatient,
} = patientsSlice.actions;
