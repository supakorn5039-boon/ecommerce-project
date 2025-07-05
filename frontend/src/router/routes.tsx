import { ROUTES } from '@/constants/RouteConst';

import type { TypeRoutes } from '@/types/Components';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));

const DashboardIndex = lazy(() => import('@/pages/dashboard/DashboardIndex'));
const LoginIndex = lazy(() => import('@/pages/auth/login/LoginIndex'));
const RegisterIndex = lazy(() => import('@/pages/auth/register/RegisterIndex'));

const privateRoutes = [
  {
    path: '/',
    element: <Index />,
    layout: 'default',
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardIndex />,
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
