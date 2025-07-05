import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SidebarState {
    currentMenu: string;
    setCurrentMenu: (menu: string) => void;
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set) => ({
            currentMenu: '',
            setCurrentMenu: (menu) => set({ currentMenu: menu }),
        }),
        {
            name: 'sidebar-store',
        }
    )
);
