import { UserEndpointToModel } from 'src/adapters/UserEndpointToModel.adapter';
import { AuthLoginPOSTEndpointSchema } from 'src/schemas/authLoginPOSTEndpoint.schema';
import { CredendialsSchema } from 'src/schemas/credendials.schema';
import { UserEndpointSchema } from 'src/schemas/userEndpoint.schema';
import { constants } from 'src/utils/constants';
import { findAccessToken } from 'src/utils/findAccessToken';
import { formatAccessToken } from 'src/utils/formatAccessToken';
import { HTTPVerbs } from 'src/utils/HTTPVerbs';
import { LSKeys } from 'src/utils/localStorageKeys';

export const AuthRepository = (signal) => {
	const baseUrl = constants.API_URL + '/auth';

	return {
		login: async (credendials) => {
			const body = CredendialsSchema.parse(credendials);

			const response = await fetch(`${baseUrl}/login`, {
				body: JSON.stringify(body),
				headers: { 'Content-Type': 'application/json', accept: 'application/json' },
				method: HTTPVerbs.POST,
				signal,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = AuthLoginPOSTEndpointSchema.parse(result);
			window.localStorage.setItem(LSKeys.accessToken, validatedResult.accessToken);
			return validatedResult;
		},

		userInfo: async () => {
			const accessToken = findAccessToken();

			const response = await fetch(`${baseUrl}/me`, {
				headers: { accept: 'application/json', Authorization: formatAccessToken(accessToken) },
				method: HTTPVerbs.GET,
				signal,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = UserEndpointSchema.parse(result);
			return UserEndpointToModel(validatedResult);
		},
	};
};
