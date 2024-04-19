import type { DiscordAPIUser } from '@/extension/background/managers/activity-manager/user-manager';
import { create } from 'zustand';

interface UserState extends DiscordAPIUser {
  setUser: (user: DiscordAPIUser) => void;
}

export const useUser = create<UserState>()((set) => ({
  global_name: '',
  username: '',
  avatar: null,
  id: '',
  setUser: (user) => set({ ...user })
}));
