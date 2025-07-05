import { ROUTES } from '@/constants/RouteConst';
import Cookie from 'js-cookie';
import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import App from '../../App';
import Portals from '../../components/Portals';
import { IRootState } from '../../store';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const navigate = useNavigate();

  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const token = Cookie.get('token');
    if (!token) {
      navigate(ROUTES.LOGIN, { replace: true });
    } else {
      setIsCheckingAuth(false);
    }
  }, [navigate]);

  if (isCheckingAuth) {
    return null;
  }

  return (
    <App>
      <div className="relative">
        <div className={`${themeConfig.navbar} main-container text-black dark:text-white-dark min-h-screen`}>
          <Sidebar />
          <div className="main-content flex flex-col min-h-screen">
            <Header />
            <Suspense>
              <div className={`${themeConfig.animation} p-6 animate__animated`}>{children}</div>
            </Suspense>
            <Footer />
            <Portals />
          </div>
        </div>
      </div>
    </App>
  );
};

export default DefaultLayout;
