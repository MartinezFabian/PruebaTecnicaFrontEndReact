export const initialSelectedPatientTest = {
  fullName: '',
  dateOfBirth: '',
  allergies: '',
  locality: '',
};

export const patientsInitialStateTest = {
  patientsList: [],
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  selectedPatient: initialSelectedPatientTest,
};

export const patientsListTest = [
  {
    id: '1',
    fullName: 'Perez Juan',
    dateOfBirth: '1985-03-12',
    allergies: 'Polen',
    locality: 'Buenos Aires',
  },
  {
    id: '2',
    fullName: 'Lopez Maria',
    dateOfBirth: '1990-07-28',
    allergies: '',
    locality: 'Cordoba',
  },
];

export const patientsStateTest = {
  patientsList: patientsListTest,
  isLoading: false,
  errorMessage: null,
  successMessage: null,
  selectedPatient: initialSelectedPatientTest,
};

export const patientTest = {
  id: 3,
  fullName: 'Paciente de Prueba',
  dateOfBirth: '1990-05-20',
  allergies: 'Polen',
  locality: 'Resistencia, Chaco',
};

export const patientUpdatedTest = {
  id: '1',
  fullName: 'fullName updated',
  dateOfBirth: '1985-03-12',
  allergies: 'allergies updated',
  locality: 'locality updated',
};

export const selectedPatientTest = {
  id: '1',
  fullName: 'Perez Juan',
  dateOfBirth: '1985-03-12',
  allergies: 'Polen',
  locality: 'Buenos Aires',
};
