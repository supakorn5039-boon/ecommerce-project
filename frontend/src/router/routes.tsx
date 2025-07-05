import { ROUTES } from '@/constants/RouteConst';

import type { TypeRoutes } from '@/types/Components';
import { lazy } from 'react';
const Index = lazy(() => import('../pages/Index'));

const DashboardIndex = lazy(() => import('@/pages/dashboard/DashboardIndex'));

const privateRoutes = [
    // dashboard
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

const publicRoutes: TypeRoutes[] = [];

const routes: TypeRoutes[] = privateRoutes.concat(publicRoutes);

export { routes };
