import { checkingCredentials, loginFailed, loginSuccess } from '../../slices/auth/authSlice';
import { AUTH_STATUS } from '../../slices/auth/authStatus';

export const loginUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      // SIMULATING A LOGIN USING LOCAL STORAGE
      dispatch(checkingCredentials());

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const user = existingUsers.find(
        (user) => user.username === userData.username && user.password === userData.password
      );

      if (!user) {
        throw new Error('Usuario y/o contraseña incorrectos');
      }

      // if the user exist
      const userWithoutPassword = {
        fullName: user.fullName,
        username: user.username,
        id: user.id,
      };

      dispatch(loginSuccess(userWithoutPassword));

      localStorage.setItem(
        'authStatus',
        JSON.stringify({
          status: AUTH_STATUS.AUTHENTICATED,
          user: userWithoutPassword,
          errorMessage: null,
        })
      );
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
};
