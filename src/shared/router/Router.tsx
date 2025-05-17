import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/main/page/MainPage';
import DetailPage from '@/pages/detail/page/DetailPage';
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
    element: <DetailPage />,
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
