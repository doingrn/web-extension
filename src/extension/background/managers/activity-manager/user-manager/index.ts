export interface DiscordAPIUser {
  id: string;
  avatar_url: string;
  username: string;
  global_name: string;
}

export class UserManager {
  public global_name?: string;
  public username?: string;
  public avatar_url?: string;

  constructor(user?: DiscordAPIUser) {
    if (user) {
      this.global_name = user.global_name;
      this.username = user.username;
      this.avatar_url = user.avatar_url;
    }
  }

  setUser(user: DiscordAPIUser) {
    this.global_name = user.global_name;
    this.username = user.username;
    this.avatar_url = user.avatar_url;
    return this;
  }
}
