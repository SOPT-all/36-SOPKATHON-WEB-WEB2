import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/main/page/MainPage';
import Detail from '@/pages/detail/Detail';
import ReviewCategoryContainer from '@/pages/upload/ReviewCategory/ReviewCategoryContainer';
import ReviewPlaceContainer from '@/pages/upload/ReviewPlace/ReviewPlaceContainer';
import Splash from '@/pages/splash/page/Splash';
import ApiTest from '@/pages/ApiTest';

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
    element: <ReviewCategoryContainer standalone={true} />,
  },
  {
    path: '/upload/place',
    element: <ReviewPlaceContainer standalone={true} />,
  },
  {
    path: '/',
    element: <Splash />,
  },
  {
    path: '/api-test',
    element: <ApiTest />,
  },
]);

export default router;
