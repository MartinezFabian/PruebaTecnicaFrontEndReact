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
    id: 1,
    fullName: 'Test',
    username: 'test',
  },
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: AUTH_STATUS.NOT_AUTHENTICATED,
  user: null,
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

export const userTestData = {
  id: 1,
  fullName: 'Test',
  username: 'test',
};
