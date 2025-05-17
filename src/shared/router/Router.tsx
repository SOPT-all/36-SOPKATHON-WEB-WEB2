import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/main/page/MainPage';
import Detail from '@/pages/detail/Detail';
import Upload from '@/pages/upload/upload';

const router = createBrowserRouter([
  {
    path: '/',
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
]);

export default router;
