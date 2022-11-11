import { UserEndpointToModel } from 'src/adapters/UserEndpointToModel.adapter';
import { IdSchema } from 'src/schemas/id.schema';
import { UsersCreateSchema } from 'src/schemas/userCreate.schema';
import { userEditSchema } from 'src/schemas/userEdit.schema';
import { UserEndpointSchema } from 'src/schemas/userEndpoint.schema';
import { constants } from 'src/utils/constants';
import { HTTPVerbs } from 'src/utils/HTTPVerbs';

export const UsersRepository = (signal) => {
	const baseUrl = constants.API_URL + '/users';

	return {
		register: async (userCreate) => {
			const body = UsersCreateSchema.parse(userCreate);

			const response = await fetch(baseUrl, {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				signal,
				method: HTTPVerbs.POST,
				body: JSON.stringify(body),
			});

			const result = await response.json();
			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = UserEndpointSchema.parse(result);

			return UserEndpointToModel(validatedResult);
		},

		edit: async ({ userId, editUser }) => {
			const _userId = IdSchema.parse(userId);
			const body = userEditSchema.parse(editUser);

			const response = await fetch(`${baseUrl}/${_userId}`, {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
				},
				signal,
				method: HTTPVerbs.PUT,
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}
			// Thsi user information is not updated
			const validatedResult = UserEndpointSchema.parse(result);
			return validatedResult;
		},
	};
};
