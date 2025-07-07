import { useUserStore } from '@/store/features/user/useUserStore';
import Cookie from 'js-cookie';
import { useEffect } from 'react';
import { CiLogout } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { IRootState } from '../../store';
import Dropdown from '../Dropdown';

const Header = () => {
  const dispatch = useDispatch();
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
    <header className="z-40 bg-white shadow-md dark:bg-gray-900">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl flex space-x-4 font-bold text-primary">
          <img src="assets/images/ecom/logo.png" alt="logo" className="size-8" />
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-violet-400 bg-[length:200%_200%] animate-gradient">
            Shop Mall
          </p>
        </Link>

        <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-700 dark:text-white">
          <Link to="/" className={location.pathname === '/' ? 'text-primary' : 'hover:text-primary'}>
            Home
          </Link>
          <Link to="/shop" className={location.pathname === '/shop' ? 'text-primary' : 'hover:text-primary'}>
            Shop
          </Link>
          <Link to="/about" className={location.pathname === '/about' ? 'text-primary' : 'hover:text-primary'}>
            About
          </Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'text-primary' : 'hover:text-primary'}>
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col text-right">
            <p className="text-sm font-semibold text-gray-800 dark:text-white">{username}</p>
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role}</span>
          </div>

          <Dropdown
            offset={[0, 8]}
            placement={isRtl ? 'bottom-start' : 'bottom-end'}
            btnClassName="relative group block"
            button={
              <img
                className="size-9 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                src="/assets/images/profile-34.jpeg"
                alt="user"
              />
            }
          >
            <ul className="text-dark !py-0 w-[230px] font-semibold">
              <li>
                <div className="flex items-center px-4 py-4">
                  <img className="rounded-md w-10 h-10 object-cover" src="/assets/images/profile-34.jpeg" alt="userProfile" />
                  <div className="ltr:pl-4 rtl:pr-4 truncate">
                    <h4 className="text-base">{username}</h4>
                    <p className="text-black/60">Role: {role}</p>
                  </div>
                </div>
              </li>
              <li className="border-t border-white-light">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-danger flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <CiLogout className="w-5 h-5 ltr:mr-2 rtl:ml-2 shrink-0" />
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
