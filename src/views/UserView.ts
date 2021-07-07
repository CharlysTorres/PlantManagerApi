import User from '../models/User';
import AvatarView from './AvatarView';

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: AvatarView.renderMany(user.avatar),
    };
  },

  renderMany(users: User[]) {
    return users.map(user => this.render(user));
  }
}