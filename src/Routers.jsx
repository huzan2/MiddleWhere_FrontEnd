// Routers.jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SplashPage from './Pages/SplashPage';
import RegisterPage from './Pages/RegisterPage';
import MainPage from './Pages/MainPage';
import SearchPage from './Pages/SearchPage';
import DetailPage from './Pages/DetailPage';
import OAuthCallback from './Pages/OAuthCallback';
import CreatePage from './Pages/CreatePage';
import HistoryPage from './Pages/HistoryPage';
import FriendPage from './Pages/FriendPage';
import GroupPage from './Pages/GroupPage';
import QuestionPage from './Pages/QuestionPage';
import ProfilePage from './Pages/ProfilePage';

const router = createBrowserRouter([
  { path: '/', element: <SplashPage /> },
  { path: '/oauth', element: <OAuthCallback /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/main', element: <MainPage /> },
  { path: '/create', element: <CreatePage /> },
  { path: '/search', element: <SearchPage /> },
  { path: '/detail', element: <DetailPage /> },
  { path: '/history', element: <HistoryPage /> },
  { path: '/friends', element: <FriendPage /> },
  { path: '/groups', element: <GroupPage /> },
  { path: '/questions', element: <QuestionPage /> },
  { path: '/profile', element: <ProfilePage /> },
]);

const Routers = () => <RouterProvider router={router} />;

export default Routers;