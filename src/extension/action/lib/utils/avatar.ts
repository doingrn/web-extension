import type { DiscordAPIUser } from '@/background/managers/activity-manager/user-manager';

function getDefaultAvatar(userId: string) {
  const index = Number(BigInt(userId) >> 22n) % 6;

  return `https://cdn.discordapp.com/embed/avatars/${index}.png?size=128`;
}

export function getUserAvatar(user: DiscordAPIUser) {
  return user.avatar !== null ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}?size=128` : getDefaultAvatar(user.id);
}
