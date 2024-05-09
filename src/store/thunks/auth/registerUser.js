import { checkingCredentials, login, authFailed } from '../../slices/auth/authSlice';
import { AUTH_STATUS } from '../../slices/auth/authStatus';

export const registerUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      // SIMULATING A REGISTRATION USING LOCAL STORAGE
      dispatch(checkingCredentials());

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      const userExist = existingUsers.find((user) => user.username === userData.username);

      if (userExist) {
        throw new Error('El nombre de usuario ya existe');
      }

      // if the user not exist, create a new user
      const newUser = {
        ...userData,
        id: existingUsers.length + 1,
      };

      existingUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(existingUsers));

      const userWithoutPassword = {
        fullName: newUser.fullName,
        username: newUser.username,
        id: newUser.id,
      };

      dispatch(login(userWithoutPassword));

      localStorage.setItem(
        'authStatus',
        JSON.stringify({
          status: AUTH_STATUS.AUTHENTICATED,
          user: userWithoutPassword,
          errorMessage: null,
        })
      );
    } catch (error) {
      dispatch(authFailed(error.message));
    }
  };
};
