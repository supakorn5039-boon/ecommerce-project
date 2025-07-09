import Cookie from 'js-cookie';
import { create } from 'zustand';

interface AuthState {
  username: string;
  role: string;
  isAuthenticated: boolean;
  setUser: (payload: { username: string; role: string }) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  username: '',
  role: '',
  isAuthenticated: !!Cookie.get('token'),

  setUser: ({ username, role }) => {
    set({ username, role, isAuthenticated: true });
  },

  clearUser: () => {
    set({ username: '', role: '', isAuthenticated: false });
  },
}));
