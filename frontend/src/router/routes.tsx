import { ROUTES } from '@/constants/RouteConst';

import type { TypeRoutes } from '@/types/Components';
import { lazy } from 'react';

const LoginIndex = lazy(() => import('@/pages/auth/login/LoginIndex'));
const RegisterIndex = lazy(() => import('@/pages/auth/register/RegisterIndex'));
const AboutIndex = lazy(() => import('@/pages/about/AboutIndex'));
const ContactIndex = lazy(() => import('@/pages/contact/ContactIndex'));
const HomeIndex = lazy(() => import('@/pages/home/HomeIndex'));
const ShopIndex = lazy(() => import('@/pages/shop/ShopIndex'));

const privateRoutes = [
  {
    path: ROUTES.HOME,
    element: <HomeIndex />,
    layout: 'default',
  },
  {
    path: ROUTES.SHOP,
    element: <ShopIndex />,
    layout: 'default',
  },
  {
    path: ROUTES.ABOUT,
    element: <AboutIndex />,
    layout: 'default',
  },
  {
    path: ROUTES.CONTACT,
    element: <ContactIndex />,
    layout: 'default',
  },
];

const publicRoutes: TypeRoutes[] = [
  {
    path: ROUTES.LOGIN,
    element: <LoginIndex />,
    layout: 'blank',
  },
  {
    path: ROUTES.REGISTER,
    element: <RegisterIndex />,
    layout: 'blank',
  },
];

const routes: TypeRoutes[] = privateRoutes.concat(publicRoutes);

export { routes };
