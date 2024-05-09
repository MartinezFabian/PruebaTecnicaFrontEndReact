import {
  authSlice,
  checkingCredentials,
  login,
  logout,
  authFailed,
} from '../../../../src/store/slices/auth/authSlice';

import { AUTH_STATUS } from '../../../../src/store/slices/auth/authStatus';

import {
  authenticatedState,
  initialStateTest,
  loginFailedState,
  notAuthenticatedState,
  registerFailureState,
  userTestData,
} from '../../../fixtures/authFixtures';

// NOTE: The test data used in this file are in "tests/fixtures/authFixtures.js"

describe('tests in authSlice.js', () => {
  test('must have the correct initial state', () => {
    // ensure that the correct slice is accessed
    expect(authSlice.name).toBe('auth');

    // ensure that the correct initial state is returned
    expect(authSlice.getInitialState()).toEqual(initialStateTest);
  });

  test('must change the state to checking', () => {
    // this simulates the checking credentials action
    const state = authSlice.reducer(initialStateTest, checkingCredentials());

    // it is verified that the resulting state after the checkingCredentials action is equal to the expected state
    expect(state.status).toBe(AUTH_STATUS.CHECKING);
  });

  test('must realize the authentication', () => {
    // this simulates the login action with the user data provided
    const state = authSlice.reducer(initialStateTest, login(userTestData));

    //it is verified that the resulting state after the login action is equal to the expected state of authenticatedState
    expect(state).toEqual(authenticatedState);
  });

  test('must login failed with an error message', () => {
    // this simulates the authentication failure action with an error message
    const state = authSlice.reducer(
      initialStateTest,
      authFailed('Usuario y/o contraseña incorrectos')
    );

    // it is verified that the resulting state after the login failed action is equal to the expected state of loginFailedState
    expect(state).toEqual(loginFailedState);
  });

  test('must realize the logout', () => {
    // this simulates the logout action
    const state = authSlice.reducer(initialStateTest, logout());

    // it is verified that the resulting state after the logout action is equal to the expected state of notAuthenticatedState
    expect(state).toEqual(notAuthenticatedState);
  });

  test('must fail to register with an error message', () => {
    // this simulates the authentication failure action with an error message
    const state = authSlice.reducer(initialStateTest, authFailed('El nombre de usuario ya existe'));

    // it is verified that the resulting state after the register failed action is equal to the expected state of registerFailureState
    expect(state).toEqual(registerFailureState);
  });
});
