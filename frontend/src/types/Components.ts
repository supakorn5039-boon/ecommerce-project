import type { ReactElement } from 'react';

export interface IconProps {
  className?: string;
  color?: string;
}

export interface TypeRoutes {
  path: string;
  element: JSX.Element;
  layout?: 'default' | 'blank';
  children?: TypeRoutes[];
  allowedRoles?: string[];
  permission?: string;
  meta?: {
    title?: string;
    icon?: ReactElement;
    hidden?: boolean;
  };
}

export interface IMenuSideBarProps {
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
}
