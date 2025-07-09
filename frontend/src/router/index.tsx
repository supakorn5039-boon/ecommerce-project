import BlankLayout from '@/components/Layouts/BlankLayout';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import ProtectedRoute from '@/components/Layouts/ProtectedRoute';
import type { TypeRoutes } from '@/types/Components';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import { routes } from './routes';

const wrapLayout = (layout: string | undefined, element: JSX.Element): JSX.Element => {
  if (layout === 'blank') return <BlankLayout>{element}</BlankLayout>;
  return <DefaultLayout>{element}</DefaultLayout>;
};

const applyLayouts = (routeArray: TypeRoutes[]): RouteObject[] =>
  routeArray.map((route): RouteObject => {
    const { layout, element, children, allowedRoles, ...rest } = route;

    let routeElement = wrapLayout(layout, element);

    if (allowedRoles && allowedRoles.length > 0) {
      routeElement = <ProtectedRoute allowedRoles={allowedRoles}>{routeElement}</ProtectedRoute>;
    }

    return {
      ...rest,
      element: routeElement,
      children: children ? applyLayouts(children) : undefined,
    };
  });

const router = createBrowserRouter(applyLayouts(routes));

export default router;
