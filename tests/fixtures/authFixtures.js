import { AUTH_STATUS } from '../../src/store/slices/auth/authStatus';

/* 
  simulated data used to establish and test different user authentication statuses
*/

export const initialStateTest = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: AUTH_STATUS.AUTHENTICATED,
  user: {
    fullName: 'Test',
    username: 'test',
    id: 1,
  },
  errorMessage: null,
};

export const loginFailedState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: null,
  errorMessage: 'Usuario y/o contraseña incorrectos',
};

export const registerFailureState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: null,
  errorMessage: 'El nombre de usuario ya existe',
};

export const userDataLogin = {
  username: 'test',
  password: '123456',
};

export const userDataRegister = {
  fullName: 'Test 2',
  username: 'test2',
  password: '123456',
  passwordRepeat: '123456',
};
