import type { ReactElement } from 'react';

export interface IconProps {
    color?: string;
    className?: string;
}

export interface TypeRoutes {
    path: string;
    element: JSX.Element;
    layout: string;
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
