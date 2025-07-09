import { ROUTES } from '@/constants/RouteConst';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-900 text-red-900 dark:text-red-300 p-6">
      <h1 className="text-6xl font-extrabold mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-6">Access Denied</h2>
      <p className="mb-6 max-w-md text-center">You do not have permission to view this page.</p>
      <Link to={ROUTES.HOME} className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
        Go to Home
      </Link>
    </div>
  );
};

export default Unauthorized;
