import { ROUTES } from '@/constants/RouteConst';
import { Navigate } from 'react-router-dom';

const Index = () => {
  return <Navigate to={ROUTES.HOME} />;
};

export default Index;
