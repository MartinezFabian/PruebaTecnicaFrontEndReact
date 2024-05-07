import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './ui/Layout';
import { EditPage } from './pages/EditPage';
import { RegisterPage } from './pages/RegisterPage';
import { AddPatient } from './pages/AddPatient';

export const App = () => {
  const currentUser = true;

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login"></Navigate>;
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
      element: <LoginPage></LoginPage>,
    },
    {
      path: '/register',
      element: <RegisterPage></RegisterPage>,
    },
  ]);

  return <RouterProvider router={router} />;
};
