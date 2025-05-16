import { createBrowserRouter } from 'react-router-dom';
import MainPage from '@/pages/main/page/MainPage';
import Page1 from '@/pages/page1/page/Page1';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/page1',
    element: <Page1 />,
  },
]);

export default router;
