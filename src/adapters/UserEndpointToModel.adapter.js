import { User } from 'src/models/user.model';

export function UserEndpointToModel(UserEndpoint) {
	return User.create({ ...UserEndpoint, password: '' });
}
