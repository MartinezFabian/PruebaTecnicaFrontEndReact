import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/authSlice';
import { patientsSlice } from './slices/patients/patientsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    patients: patientsSlice.reducer,
  },
});
