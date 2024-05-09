import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STATUS } from './authStatus';

const initialState = JSON.parse(localStorage.getItem('authStatus')) || {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: null,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = AUTH_STATUS.AUTHENTICATED;
      state.user = action.payload;
      state.errorMessage = null;
    },
    logout: (state) => {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = null;
    },
    authFailed: (state, action) => {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = action.payload;
    },
    checkingCredentials: (state) => {
      state.status = AUTH_STATUS.CHECKING;
    },
    resetErrorMessage: (state) => {
      state.errorMessage = null;
    },
  },
});

export const { login, logout, authFailed, checkingCredentials, resetErrorMessage } =
  authSlice.actions;
