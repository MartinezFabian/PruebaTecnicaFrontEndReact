import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './ui/Layout';
import { EditPage } from './pages/EditPage';
import { RegisterPage } from './pages/RegisterPage';
import { AddPatient } from './pages/AddPatient';
import { useSelector } from 'react-redux';
import { AUTH_STATUS } from './store/slices/auth/authStatus';

export const App = () => {
  const { status } = useSelector((state) => state.auth);

  const currentUser = status === AUTH_STATUS.AUTHENTICATED ? true : false;

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
  ]);

  return <RouterProvider router={router} />;
};
