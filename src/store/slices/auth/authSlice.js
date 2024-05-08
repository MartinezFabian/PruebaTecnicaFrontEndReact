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
    loginSuccess: (state, action) => {
      state.status = AUTH_STATUS.AUTHENTICATED;
      state.user = action.payload;
      state.errorMessage = null;
    },
    loginFailed: (state, action) => {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = action.payload;
    },
    logout: (state) => {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.user = null;
      state.errorMessage = null;
    },
    registerSuccess(state, action) {
      state.status = AUTH_STATUS.AUTHENTICATED;
      state.user = action.payload;
      state.errorMessage = null;
    },
    registerFailure(state, action) {
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

export const {
  loginSuccess,
  loginFailed,
  logout,
  registerSuccess,
  registerFailure,
  checkingCredentials,
  resetErrorMessage,
} = authSlice.actions;
