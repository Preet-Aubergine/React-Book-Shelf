import App from '../App';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Register from '../pages/Register';
import Error from '../pages/Error';

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/error',
    element: <Error />,
  },
]; 