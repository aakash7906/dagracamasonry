import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/website/Home';
import { About } from '@/pages/website/About';
import { Services } from '@/pages/website/Services';
import { Gallery } from '@/pages/website/Gallery';
import { Testimonials } from '@/pages/website/Testimonials';
import { Contact } from '@/pages/website/Contact';
import { NotFound } from '@/pages/website/NotFound';
import { UserAccount } from '@/pages/website/UserAccount';
import { CartPage } from '@/pages/website/CartPage';
import { Login, Signup } from '@/pages/auth';
import {
  Princeton,
  Bernardsville,
  Bedminster,
  SomersetHills,
  Mendham,
  Morristown,
  ShortHills,
  Summit,
  Chatham,
  Chester,
  FarHills,
  Tewksbury,
  Lambertville,
  Hopewell,
  Westfield,
  BaskingRidge,
  Clinton,
  Warren,
  NewVernon,
  Harding,
  SaddleRiver,
  Alpine,
  Doylestown,
  NewHope,
  HunterdonCounty,
  MorrisCounty,
  MercerCounty,
} from '@/pages/ServiceArea';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signin',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/register',
    element: <Signup />,
  },
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
        path: 'account',
        element: <UserAccount />,
      },
      {
        path: 'my-account',
        element: <UserAccount />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      // Service Area Pages (Both /service-area/ and /servicearea/ paths supported)
      { path: 'service-area/princeton', element: <Princeton /> },
      { path: 'servicearea/princeton', element: <Princeton /> },
      { path: 'service-area/bernardsville', element: <Bernardsville /> },
      { path: 'servicearea/bernardsville', element: <Bernardsville /> },
      { path: 'service-area/bedminster', element: <Bedminster /> },
      { path: 'servicearea/bedminster', element: <Bedminster /> },
      { path: 'service-area/somerset-hills', element: <SomersetHills /> },
      { path: 'servicearea/somerset-hills', element: <SomersetHills /> },
      { path: 'service-area/mendham', element: <Mendham /> },
      { path: 'servicearea/mendham', element: <Mendham /> },
      { path: 'service-area/morristown', element: <Morristown /> },
      { path: 'servicearea/morristown', element: <Morristown /> },
      { path: 'service-area/short-hills', element: <ShortHills /> },
      { path: 'servicearea/short-hills', element: <ShortHills /> },
      { path: 'service-area/summit', element: <Summit /> },
      { path: 'servicearea/summit', element: <Summit /> },
      { path: 'service-area/chatham', element: <Chatham /> },
      { path: 'servicearea/chatham', element: <Chatham /> },
      { path: 'service-area/chester', element: <Chester /> },
      { path: 'servicearea/chester', element: <Chester /> },
      { path: 'service-area/far-hills', element: <FarHills /> },
      { path: 'servicearea/far-hills', element: <FarHills /> },
      { path: 'service-area/tewksbury', element: <Tewksbury /> },
      { path: 'servicearea/tewksbury', element: <Tewksbury /> },
      { path: 'service-area/lambertville', element: <Lambertville /> },
      { path: 'servicearea/lambertville', element: <Lambertville /> },
      { path: 'service-area/hopewell', element: <Hopewell /> },
      { path: 'servicearea/hopewell', element: <Hopewell /> },
      { path: 'service-area/westfield', element: <Westfield /> },
      { path: 'servicearea/westfield', element: <Westfield /> },
      { path: 'service-area/basking-ridge', element: <BaskingRidge /> },
      { path: 'servicearea/basking-ridge', element: <BaskingRidge /> },
      { path: 'service-area/clinton', element: <Clinton /> },
      { path: 'servicearea/clinton', element: <Clinton /> },
      { path: 'service-area/warren', element: <Warren /> },
      { path: 'servicearea/warren', element: <Warren /> },
      { path: 'service-area/new-vernon', element: <NewVernon /> },
      { path: 'servicearea/new-vernon', element: <NewVernon /> },
      { path: 'service-area/harding', element: <Harding /> },
      { path: 'servicearea/harding', element: <Harding /> },
      { path: 'service-area/saddle-river', element: <SaddleRiver /> },
      { path: 'servicearea/saddle-river', element: <SaddleRiver /> },
      { path: 'service-area/alpine', element: <Alpine /> },
      { path: 'servicearea/alpine', element: <Alpine /> },
      { path: 'service-area/doylestown', element: <Doylestown /> },
      { path: 'servicearea/doylestown', element: <Doylestown /> },
      { path: 'service-area/new-hope', element: <NewHope /> },
      { path: 'servicearea/new-hope', element: <NewHope /> },
      { path: 'service-area/hunterdon-county', element: <HunterdonCounty /> },
      { path: 'servicearea/hunterdon-county', element: <HunterdonCounty /> },
      { path: 'service-area/morris-county', element: <MorrisCounty /> },
      { path: 'servicearea/morris-county', element: <MorrisCounty /> },
      { path: 'service-area/mercer-county', element: <MercerCounty /> },
      { path: 'servicearea/mercer-county', element: <MercerCounty /> },
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
