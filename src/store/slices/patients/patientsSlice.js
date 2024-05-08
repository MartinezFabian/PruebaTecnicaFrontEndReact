const initialState = {
  patientsList: [],
  isLoading: false,
  error: null,
  selectedPatient: null,
};

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    fetchPatientsRequest: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchPatientsSuccess: (state, action) => {
      state.isLoading = false;
      state.patientsList = action.payload;
      state.error = null;
    },
    fetchPatientsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addPatient: (state, action) => {
      state.patientsList.push(action.payload);
    },
    updatePatient: (state, action) => {
      state.patientsList.map((patient) => {
        if (patient.id === action.payload.id) {
          return action.payload;
        }

        return patient;
      });
    },

    deletePatient: (state, action) => {
      state.patientsList = state.patientsList.filter((patient) => patient.id !== action.payload);
    },

    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
  },
});
