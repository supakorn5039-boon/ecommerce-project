import type { UserResponse } from '@/types/Credential';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  username?: string;
  role?: string;
  setUser: (user: UserResponse) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      username: '',
      role: '',
      setUser: (user) => set({ username: user.username, role: user.role }),
      clearUser: () => set({ username: '', role: '' }),
    }),
    {
      name: 'user-store',
    }
  )
);
