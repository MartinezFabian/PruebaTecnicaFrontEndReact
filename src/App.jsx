import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './ui/Layout';
import { EditPage } from './pages/EditPage';
import { RegisterPage } from './pages/RegisterPage';

export const App = () => {
  const currentUser = false;

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
