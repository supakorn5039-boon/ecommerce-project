import { ROUTES } from '@/constants/RouteConst';
import { useAuthStore } from '@/store/features/auth/useAuthStore';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string | string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />;
  }
  return children;
};

export default ProtectedRoute;
