import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/main/page/MainPage';
import DetailPage from '@/pages/detail/page/DetailPage';
import Upload from '@/pages/upload/ReviewCategory/ReviewCategoryContainer';
import Splash from '@/pages/splash/page/Splash';

const router = createBrowserRouter([
  {
    path: '/main',
    element: <MainPage />,
  },

  {
    path: '/detail/:id',
    element: <DetailPage />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
  {
    path: '/',
    element: <Splash />,
  },
]);

export default router;
