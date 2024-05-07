import { createSlice } from '@reduxjs/toolkit';
import { AUTH_STATUS } from './authStatus';

const initialState = {
  status: AUTH_STATUS.CHECKING,
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
      state.error = null;
    },
    registerFailure(state, action) {
      state.status = AUTH_STATUS.NOT_AUTHENTICATED;
      state.user = null;
      state.error = action.payload;
    },
  },
});

export const { loginSuccess, loginFailed, logout, registerSuccess, registerFailure } =
  authSlice.actions;
