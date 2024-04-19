import type { DiscordAPIUser } from '@/extension/background/managers/activity-manager/user-manager';
import { create } from 'zustand';

interface UserState extends DiscordAPIUser {
  setUser: (user: DiscordAPIUser) => void;
}

export const useUser = create<UserState>()((set) => ({
  global_name: '',
  username: '',
  avatar_url: '',
  id: '',
  setUser: (user) => set({ global_name: user.global_name, username: user.username, avatar_url: user.avatar_url })
}));
