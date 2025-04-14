import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from '@/Pages/MainPage';

const Routers = () => {
  const routes = [
    {
      path: '/',
      element: <MainPage />,
    },
  ];
  const router = createBrowserRouter(routes);
  return <RouterProvider router={router} />;
};

export default Routers;
