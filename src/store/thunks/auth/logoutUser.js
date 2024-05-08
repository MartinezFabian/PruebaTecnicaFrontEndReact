import { logout } from '../../slices/auth/authSlice';

export const logoutUser = () => {
  return async (dispatch, getState) => {
    try {
      // SIMULATING A LOGOUT USING LOCAL STORAGE
      localStorage.removeItem('authStatus');

      dispatch(logout());
    } catch (error) {
      console.error(error);
    }
  };
};
