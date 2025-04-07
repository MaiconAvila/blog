import { createBrowserRouter } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import CategoryPage from '@/pages/CategoryPage';
import PostPage from '@/pages/PostPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/category/:categoryId',
    element: <CategoryPage />,
  },
  {
    path: '/post/:categoryId/:postId',
    element: <PostPage />,
  },
]);
