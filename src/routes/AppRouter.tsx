import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/website/Home';
import { About } from '@/pages/website/About';
import { Services } from '@/pages/website/Services';
import { Gallery } from '@/pages/website/Gallery';
import { Testimonials } from '@/pages/website/Testimonials';
import { Contact } from '@/pages/website/Contact';
import { NotFound } from '@/pages/website/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'gallery',
        element: <Gallery />,
      },
      {
        path: 'testimonials',
        element: <Testimonials />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
