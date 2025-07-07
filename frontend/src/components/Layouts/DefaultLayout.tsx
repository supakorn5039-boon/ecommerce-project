import Cookie from 'js-cookie';
import { PropsWithChildren, Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/RouteConst';
import { IRootState } from '@/store';

import App from '../../App';
import Portals from '../../components/Portals';
import Footer from './Footer';
import Header from './Header';

const DefaultLayout = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const { navbar, animation } = useSelector((state: IRootState) => state.themeConfig);

  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const token = Cookie.get('token');
    if (!token) {
      navigate(ROUTES.LOGIN, { replace: true });
    } else {
      setIsAuthChecked(true);
    }
  }, [navigate]);

  if (!isAuthChecked) return null;

  return (
    <App>
      <div className="relative">
        <div className={`${navbar} main-container text-black dark:text-white-dark min-h-screen`}>
          <div className={`flex flex-col min-h-screen `}>
            <Header />
            <Suspense>
              <div className={`${animation} p-6 animate__animated`}>{children}</div>
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
