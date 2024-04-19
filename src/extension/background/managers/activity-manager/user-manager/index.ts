export interface DiscordAPIUser {
  id: string;
  avatar: string | null;
  username: string;
  global_name: string;
}

export class UserManager {
  public id?: string;
  public avatar?: string | null;
  public username?: string;
  public global_name?: string;

  constructor(user?: DiscordAPIUser) {
    if (user) this.setUser(user);
  }

  setUser(user: DiscordAPIUser) {
    this.global_name = user.global_name;
    this.username = user.username;
    this.avatar = user.avatar;
    return this;
  }
}
