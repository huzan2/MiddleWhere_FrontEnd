// src/Routers.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SplashPage from './Pages/SplashPage';
import RegisterPage from './Pages/RegisterPage';
import MainPage from './Pages/MainPage';
import SearchPage from './Pages/SearchPage';
import DetailPage from './Pages/DetailPage';
import OAuthCallback from './Pages/OAuthCallback';

const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/search', element: <SearchPage /> },
  { path: '/detail', element: <DetailPage /> },
  { path: '/oauth', element: <OAuthCallback /> },
]);

const Routers = () => <RouterProvider router={router} />;

export default Routers;
