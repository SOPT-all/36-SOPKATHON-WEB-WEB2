import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/main/page/MainPage';
import Detail from '@/pages/detail/Detail';
import Upload from '@/pages/upload/ReviewCategory/ReviewCategoryContainer';
import Splash from '@/pages/splash/page/Splash';

const router = createBrowserRouter([
  {
    path: '/main',
    element: <MainPage />,
  },

  {
    path: '/detail/:id',
    element: <Detail />,
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
