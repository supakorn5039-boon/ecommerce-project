import { useUserStore } from '@/store/features/user/useUserStore';
import { toggleSidebar } from '@/store/themeConfigSlice';
import Cookie from 'js-cookie';
import React, { useEffect } from 'react';
import type { IconBaseProps } from 'react-icons';
import { CiCircleInfo, CiLogout, CiUser } from 'react-icons/ci';
import { IoIosMenu, IoMdCloseCircleOutline, IoMdNotificationsOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { IRootState } from '../../store';
import Dropdown from '../Dropdown';
type UserSlice = { username?: string; role?: string };

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useUserStore((state) => state.username);
  const role = useUserStore((state) => state.role);

  useEffect(() => {
    document.querySelectorAll('ul.horizontal-menu a.active').forEach((el) => el.classList.remove('active'));

    const selector = document.querySelector(`ul.horizontal-menu a[href="${window.location.pathname}"]`);
    if (selector) {
      selector.classList.add('active');
      const ul = selector.closest('ul.sub-menu');
      if (ul) {
        const menuItem = ul.closest('li.menu');
        if (menuItem) {
          const firstNavLink = menuItem.querySelector('.nav-link');
          if (firstNavLink) {
            setTimeout(() => {
              firstNavLink.classList.add('active');
            });
          }
        }
      }
    }
  }, [location.pathname]);

  const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      profile: 'user-profile.jpeg',
      message: '<strong className="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
      time: '45 min ago',
    },
    {
      id: 2,
      profile: 'profile-34.jpeg',
      message: '<strong className="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
      time: '9h Ago',
    },
    {
      id: 3,
      profile: 'profile-16.jpeg',
      message: '<strong className="text-sm mr-1">Anna Morgan</strong>Upload a file',
      time: '9h Ago',
    },
  ]);

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleLogout = () => {
    Cookie.remove('token');
    Cookie.remove('role');
    useUserStore.getState().clearUser();
    navigate('/login');
  };

  return (
    <header className="z-40">
      <div>
        <div className="relative bg-white flex w-full items-center px-5 py-2.5">
          <div className="flex space-x-4 items-center ltr:mr-2 rtl:ml-2">
            <button
              type="button"
              className="w-8 h-8 rounded-full items-center hover:bg-gray-500/10 block lg:hidden"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IoIosMenu />
            </button>
            <p className="text-base font-semibold">Title Header</p>
          </div>
          <div className="sm:flex-1 ltr:sm:ml-0 ltr:ml-auto sm:rtl:mr-0 rtl:mr-auto flex items-center space-x-1.5 lg:space-x-2 rtl:space-x-reverse">
            <div className="sm:ltr:mr-auto sm:rtl:ml-auto" />

            <div className="dropdown shrink-0">
              <Dropdown
                offset={[0, 8]}
                placement={isRtl ? 'bottom-start' : 'bottom-end'}
                btnClassName="relative block p-2 rounded-full hover:text-primary hover:bg-white-light/90"
                button={React.createElement(IoMdNotificationsOutline as React.FC<IconBaseProps>, {
                  className: 'size-6',
                })}
              >
                <ul className="!py-0 text-dark w-[300px] sm:w-[350px] divide-y">
                  <li onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center px-4 py-2 justify-between font-semibold">
                      <h4 className="text-lg">Notification</h4>
                      {notifications.length ? (
                        <span className="badge bg-primary/80">{notifications.length} New</span>
                      ) : null}
                    </div>
                  </li>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map((notification) => (
                        <li key={notification.id} onClick={(e) => e.stopPropagation()}>
                          <div className="group flex items-center px-4 py-2">
                            <div className="grid place-content-center rounded">
                              <div className="w-12 h-12 relative">
                                <img
                                  className="w-12 h-12 rounded-full object-cover"
                                  alt="profile"
                                  src={`/assets/images/${notification.profile}`}
                                />
                                <span className="bg-success w-2 h-2 rounded-full block absolute right-[6px] bottom-0"></span>
                              </div>
                            </div>
                            <div className="ltr:pl-3 rtl:pr-3 flex flex-auto">
                              <div className="ltr:pr-3 rtl:pl-3">
                                <h6
                                  dangerouslySetInnerHTML={{
                                    __html: notification.message,
                                  }}
                                />
                                <span className="text-xs block font-normal">{notification.time}</span>
                              </div>
                              <button
                                type="button"
                                className="ltr:ml-auto rtl:mr-auto text-neutral-300 hover:text-danger opacity-0 group-hover:opacity-100"
                                onClick={() => removeNotification(notification.id)}
                              >
                                <IoMdCloseCircleOutline />
                              </button>
                            </div>
                          </div>
                        </li>
                      ))}
                      <li>
                        <div className="p-4">
                          <button className="btn btn-primary block w-full btn-small">Read All Notifications</button>
                        </div>
                      </li>
                    </>
                  ) : (
                    <li onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="!grid place-content-center hover:!bg-transparent text-lg min-h-[200px]"
                      >
                        <div className="mx-auto ring-4 ring-primary/30 rounded-full mb-4 text-primary">
                          <CiCircleInfo />
                        </div>
                        No data available.
                      </button>
                    </li>
                  )}
                </ul>
              </Dropdown>
            </div>

            <div className="flex flex-col pr-[1rem]">
              <p className="font-semibold">{username}</p>
              <p className="flex justify-end text-gray-60">{role}</p>
            </div>

            <div className="dropdown shrink-0 flex">
              <Dropdown
                offset={[0, 8]}
                placement={isRtl ? 'bottom-start' : 'bottom-end'}
                btnClassName="relative group block"
                button={
                  <img
                    className="w-9 h-9 rounded-full object-cover saturate-50 group-hover:saturate-100"
                    src="/assets/images/profile-34.jpeg"
                    alt="userProfile"
                  />
                }
              >
                <ul className="text-dark !py-0 w-[230px] font-semibold">
                  <li>
                    <div className="flex items-center px-4 py-4">
                      <img
                        className="rounded-md w-10 h-10 object-cover"
                        src="/assets/images/profile-34.jpeg"
                        alt="userProfile"
                      />
                      <div className="ltr:pl-4 rtl:pr-4 truncate">
                        <h4 className="text-base">
                          John Doe
                          <span className="text-xs bg-success-light rounded text-success px-1 ltr:ml-2 rtl:ml-2">
                            Pro
                          </span>
                        </h4>
                        <button type="button" className="text-black/60 hover:text-primary ">
                          johndoe@gmail.com
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link to="/users/profile" className="">
                      <CiUser className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Profile
                    </Link>
                  </li>
                  <li className="border-t border-white-light">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="text-danger flex items-center w-full px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <CiLogout className="w-4.5 h-4.5 ltr:mr-2 rtl:ml-2 shrink-0" />
                      Sign Out
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
