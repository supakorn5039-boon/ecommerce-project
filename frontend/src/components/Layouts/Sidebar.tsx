import { ROUTES } from '@/constants/RouteConst';
import { useSidebarStore } from '@/store/features/sidebar/useCurrentSidebar';
import { COLORS } from '@/theme/colors';
import type { IMenuSideBarProps } from '@/types/Components';
import React, { useEffect, useState } from 'react';
import AnimateHeight from 'react-animate-height';
import { IoIosMenu } from 'react-icons/io';
import { MdOutlineDashboard } from 'react-icons/md';
import { PiCaretDownLight } from 'react-icons/pi';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { IRootState } from '../../store';
import { toggleSidebar } from '../../store/themeConfigSlice';

const Sidebar = () => {
  const { currentMenu, setCurrentMenu } = useSidebarStore();
  const [hoveredItem, setHoveredItem] = useState<string>('');
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebarOpen = useSelector((state: IRootState) => state.themeConfig.sidebar);

  const isExactRouteMatch = (route: string) => {
    if (location.pathname === route) {
      return true;
    }

    if (location.pathname.startsWith(route)) {
      if (route === '/') {
        return location.pathname === '/';
      }

      const remainingPath = location.pathname.substring(route.length);
      return remainingPath === '' || remainingPath.startsWith('/');
    }

    return false;
  };

  useEffect(() => {
    if (!sidebarOpen && window.innerWidth >= 1024) {
      dispatch(toggleSidebar());
    }
  }, []);

  const toggleMenu = (value: string) => {
    if (currentMenu === value) {
      setCurrentMenu('');
    } else {
      setCurrentMenu(value);
    }
  };

  const handleNavigation = (link: string) => {
    navigate(link);
    setCurrentMenu('');

    if (window.innerWidth < 1024) {
      dispatch(toggleSidebar());
    }
  };

  const MenuSidebar: IMenuSideBarProps[] = [
    {
      group_id: 1,
      group_header: 'title',
      section: 'dashboard',
      menu: [
        {
          name: 'Dashboard',
          icon: <MdOutlineDashboard className="size-6" />,
          link: ROUTES.DASHBOARD,
          permission: '',
        },
      ],
    },
  ];

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [location]);

  return (
    <React.Fragment>
      <nav className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] z-50 transition-all duration-300`}>
        <div className="bg-white h-full">
          <div className="flex justify-between items-center px-4 py-3">
            {sidebarOpen ? (
              <>
                {/* <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" /> */}
                <button
                  type="button"
                  className="w-8 h-8 rounded-full items-center hover:bg-gray-500/10 hidden lg:block"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <IoIosMenu className="m-auto" />
                </button>
              </>
            ) : (
              <>
                <img className="w-8 ml-[5px] flex-none" src="/assets/images/logo.svg" alt="logo" />
                <button
                  type="button"
                  className="size-8 rounded-full items-center hover:bg-gray-500/10 hidden lg:block"
                  onClick={() => dispatch(toggleSidebar())}
                >
                  <IoIosMenu className="m-auto" />
                </button>
              </>
            )}
          </div>
          <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
            <ul className="relative font-semibold space-y-0.5 px-4 pt-2 text-black">
              {MenuSidebar.map((group, groupIndex) => {
                return (
                  <div key={groupIndex}>
                    <li className="nav-item">
                      {group.section && (
                        <>
                          {themeConfig.sidebar && (
                            <h2 className={`${group.group_header ? `py-2 px-4 flex items-center  font-normal -mx-4 mb-1 ` : ''}`}>
                              <span>{group.group_header}</span>
                            </h2>
                          )}
                        </>
                      )}
                      {group.menu.map((menu: any, menuIndex: number) => {
                        const isActive = isExactRouteMatch(menu.link);

                        return (
                          <ul key={menuIndex}>
                            {menu.sub_menu && menu.sub_menu.length > 0 ? (
                              <>
                                <li className="menu nav-item">
                                  <button
                                    type="button"
                                    className={`flex items-center w-full rounded-md p-2.5 text-left transition-colors ${
                                      currentMenu === menu.name
                                        ? 'active bg-[#000]/[0.08] text-black'
                                        : hoveredItem === menu.name
                                        ? 'bg-orange-sub'
                                        : ''
                                    }`}
                                    onClick={() => toggleMenu(menu.name)}
                                    onMouseEnter={() => setHoveredItem(menu.name)}
                                    onMouseLeave={() => setHoveredItem('')}
                                  >
                                    <span className="mr-2">
                                      {React.cloneElement(menu.icon, {
                                        color:
                                          hoveredItem === menu.name || currentMenu === menu.name || isActive ? COLORS.orange : COLORS['gray-sub'],
                                      })}
                                    </span>
                                    {sidebarOpen && (
                                      <>
                                        <span className="flex-1 text-left ml-2">{menu.name}</span>
                                        <div
                                          className="w-6 flex items-center justify-center transform transition-transform duration-300"
                                          style={{
                                            transform: currentMenu !== menu.name ? 'rotate(-90deg)' : 'rotate(0deg)',
                                          }}
                                        >
                                          <PiCaretDownLight />
                                        </div>
                                      </>
                                    )}
                                  </button>

                                  <AnimateHeight duration={300} height={currentMenu === menu.name ? 'auto' : 0}>
                                    {sidebarOpen && (
                                      <ul className="sub-menu">
                                        {menu.sub_menu?.map((sub_menu: any, index: number) => {
                                          const isSubMenuActive = isExactRouteMatch(sub_menu.link);

                                          return (
                                            <li key={index}>
                                              <div
                                                className={`cursor-pointer ${
                                                  isSubMenuActive
                                                    ? 'bg-[#000]/[0.08] text-black'
                                                    : hoveredItem === `submenu-${sub_menu.name}`
                                                    ? 'bg-orange-sub'
                                                    : ''
                                                }`}
                                                onClick={() => handleNavigation(sub_menu.link)}
                                                onMouseEnter={() => setHoveredItem(`submenu-${sub_menu.name}`)}
                                                onMouseLeave={() => setHoveredItem('')}
                                              >
                                                {sub_menu.name}
                                              </div>
                                            </li>
                                          );
                                        })}
                                      </ul>
                                    )}
                                  </AnimateHeight>
                                </li>
                              </>
                            ) : (
                              <li className="flex items-center">
                                <div
                                  className={`mb-1 flex items-center overflow-hidden whitespace-nowrap rounded-md p-2.5 cursor-pointer ${
                                    isActive ? 'bg-orange-sub text-black' : hoveredItem === menu.name ? 'bg-orange-sub text-black' : ''
                                  } w-full`}
                                  onClick={() => handleNavigation(menu.link)}
                                  onMouseEnter={() => setHoveredItem(menu.name)}
                                  onMouseLeave={() => setHoveredItem('')}
                                >
                                  <div>
                                    {React.cloneElement(menu.icon, {
                                      color: hoveredItem === menu.name || isActive ? COLORS.orange : COLORS['gray-sub'],
                                    })}
                                  </div>
                                  {sidebarOpen && <span className="pl-[1rem]">{menu.name}</span>}
                                </div>
                              </li>
                            )}
                          </ul>
                        );
                      })}
                    </li>
                  </div>
                );
              })}
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
