import { ROUTES } from '@/constants/RouteConst';
import { useUserStore } from '@/store/features/user/useUserStore';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { IRootState } from '../../store';
import Dropdown from '../Dropdown';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = useUserStore((state) => state.username);
  const role = useUserStore((state) => state.role);
  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const handleLogout = () => {
    Cookie.remove('token');
    Cookie.remove('role');
    useUserStore.getState().clearUser();
    navigate('/login');
    window.location.reload();
  };

  useEffect(() => {
    const activeElements = document.querySelectorAll('ul.horizontal-menu a.active');
    activeElements.forEach((el) => el.classList.remove('active'));
    const selector = document.querySelector(`ul.horizontal-menu a[href="${location.pathname}"]`);
    if (selector) {
      selector.classList.add('active');
    }
  }, [location.pathname]);

  return (
    <header className="z-40 bg-white shadow-md dark:bg-gray-900 animate-slide-in-down transition duration-700">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl flex space-x-4 font-bold text-primary">
          <img src="assets/images/ecom/coffee-shop.png" alt="logo" className="size-8" />
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-violet-400 bg-[length:200%_200%] animate-gradient">Café</p>
        </Link>

        <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-700 dark:text-white">
          {[ROUTES.HOME, ROUTES.SHOP, ROUTES.ABOUT, ROUTES.CONTACT].map((path, idx) => {
            const names = ['Home', 'Shop', 'About', 'Contact'];
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`
                  relative transition duration-300
                  ${isActive ? 'text-primary' : 'hover:text-primary'}
                  after:content-[''] after:absolute after:w-0 after:h-[2px] after:bg-primary after:left-0 after:-bottom-1 
                  hover:after:w-full after:transition-all after:duration-300
                `}
              >
                {names[idx]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right">
            <p className="text-sm font-semibold text-gray-800 dark:text-white capitalize">{username}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role}</span>
          </div>

          <Dropdown
            offset={[0, 8]}
            placement={isRtl ? 'bottom-start' : 'bottom-end'}
            btnClassName="relative group block"
            button={
              <img
                className="size-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600 transition-transform duration-300 hover:scale-105"
                src="/assets/images/profile-34.jpeg"
                alt="user"
              />
            }
          >
            <ul className="text-dark !py-0 w-[230px] font-semibold border border-gray-200 rounded-lg mt-2 bg-white dark:bg-gray-800 shadow-lg animate-fade-in">
              <li>
                <div className="flex items-center px-4 py-4">
                  <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/profile-34.jpeg" alt="userProfile" />
                  <div className="ltr:pl-4 rtl:pr-4 truncate">
                    <h4 className="text-base capitalize">{username}</h4>
                    <p className="text-black/60 dark:text-white/60 capitalize">Role: {role}</p>
                  </div>
                </div>
              </li>
              <li className="border-t border-white-light">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-danger flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CiLogout className="size-5 ltr:mr-2 rtl:ml-2 shrink-0" />
                  Sign Out
                </button>
              </li>
            </ul>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
