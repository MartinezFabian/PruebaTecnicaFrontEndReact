import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './ui/Layout';
import { EditPage } from './pages/EditPage';
import { RegisterPage } from './pages/RegisterPage';
import { AddPatient } from './pages/AddPatient';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_STATUS } from './store/slices/auth/authStatus';
import { useEffect } from 'react';
import { fetchPatients } from './store/thunks/patients/fetchPatients';

export const App = () => {
  // status of the authentication
  const { status } = useSelector((state) => state.auth);

  // check if the user is authenticated
  const currentUser = status === AUTH_STATUS.AUTHENTICATED ? true : false;

  const dispatch = useDispatch();

  // fetch patients when the user is authenticated
  useEffect(() => {
    if (currentUser) {
      dispatch(fetchPatients());
    }
  }, [currentUser]);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"></Navigate>;
    }

    return children;
  };

  const AuthProtectedRoute = ({ children }) => {
    if (currentUser) {
      return <Navigate to="/"></Navigate>;
    }

    return children;
  };

  const RedirectToLogin = () => {
    return <Navigate to="/login"></Navigate>;
  };

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: '/',
          element: <HomePage></HomePage>,
        },
        {
          path: '/details/:id',
          element: <DetailsPage></DetailsPage>,
        },
        {
          path: '/edit/:id',
          element: <EditPage></EditPage>,
        },
        {
          path: '/add-patient',
          element: <AddPatient></AddPatient>,
        },
      ],
    },
    {
      path: '/login',
      element: (
        <AuthProtectedRoute>
          <LoginPage></LoginPage>,
        </AuthProtectedRoute>
      ),
    },
    {
      path: '/register',
      element: (
        <AuthProtectedRoute>
          <RegisterPage></RegisterPage>
        </AuthProtectedRoute>
      ),
    },
    {
      path: '*',
      element: <RedirectToLogin></RedirectToLogin>,
    },
  ]);

  return <RouterProvider router={router} />;
};
