import { ROUTES } from '@/constants/RouteConst';
import ShopDetail from '@/pages/shop/ShopDetail';

import type { TypeRoutes } from '@/types/Components';
import { lazy } from 'react';

const Index = lazy(() => import('@/pages/Index'));

const Home = lazy(() => import('@/pages/home/HomeIndex'));
const Login = lazy(() => import('@/pages/auth/login/LoginIndex'));
const Register = lazy(() => import('@/pages/auth/register/RegisterIndex'));
const About = lazy(() => import('@/pages/about/AboutIndex'));
const Contact = lazy(() => import('@/pages/contact/ContactIndex'));
const Shop = lazy(() => import('@/pages/shop/ShopIndex'));
const Unauthorized = lazy(() => import('@/components/Layouts/Unauthorized'));

export const routes: TypeRoutes[] = [
  {
    path: ROUTES.HOME,
    element: <Home />,
    layout: 'default',
    meta: { title: 'Home' },
  },
  {
    path: ROUTES.SHOP,
    element: <Shop />,
    layout: 'default',
    meta: { title: 'Shop' },
  },
  {
    path: `${ROUTES.SHOP}/:id`,
    element: <ShopDetail />,
    layout: 'default',
    meta: { title: 'Shop' },
  },
  {
    path: ROUTES.ABOUT,
    element: <About />,
    layout: 'default',
    meta: { title: 'About' },
  },
  {
    path: ROUTES.CONTACT,
    element: <Contact />,
    layout: 'default',
    meta: { title: 'Contact' },
  },
  {
    path: ROUTES.ADMIN,
    element: <Index />,
    layout: 'default',
    allowedRoles: ['admin'],
    meta: { title: 'Admin' },
  },
  {
    path: ROUTES.UNAUTHORIZED,
    element: <Unauthorized />,
    layout: 'blank',
    meta: { hidden: true },
  },
  {
    path: ROUTES.LOGIN,
    element: <Login />,
    layout: 'blank',
    meta: { title: 'Login', hidden: true },
  },
  {
    path: ROUTES.REGISTER,
    element: <Register />,
    layout: 'blank',
    meta: { title: 'Register', hidden: true },
  },
];
