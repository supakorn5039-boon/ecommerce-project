import type { ReactElement } from 'react';

export type IconProps = {
  className?: string;
  color?: string;
};

export type TypeRoutes = {
  path: string;
  element: JSX.Element;
  layout?: 'default' | 'blank';
  children?: TypeRoutes[];
  allowedRoles?: string | string[];
  permission?: string;
  meta?: {
    title?: string;
    icon?: ReactElement;
    hidden?: boolean;
  };
};

export type IMenuSideBarProps = {
  group_id: number;
  group_header?: string;
  section: string;
  menu: {
    name: string;
    icon?: ReactElement;
    link?: string;
    sub_menu?: {
      name: string;
      link: string;
    }[];
    permission?: string;
  }[];
};

export type QueryParamsProps = {
  search?: string;
  page?: number;
};
