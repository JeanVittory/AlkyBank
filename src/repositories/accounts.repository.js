import { AccountsCreateSchema } from 'src/schemas/accountCreate.schema';
import { AccountEndpointSchema } from 'src/schemas/accountEndpoint.schema';
import { AccountsIdPOSTEndpointSchema } from 'src/schemas/accountIdPOSTEndpoint.schema';
import { IdSchema } from 'src/schemas/id.schema';
import { MovementCreateSchema } from 'src/schemas/movementCreate.schema';
import { constants } from 'src/utils/constants';
import { findAccessToken } from 'src/utils/findAccessToken';
import { formatAccessToken } from 'src/utils/formatAccessToken';
import { HTTPVerbs } from 'src/utils/HTTPVerbs';

export const AccounstRepository = (signal) => {
	const baseUrl = constants.API_URL + '/accounts';

	return {
		create: async (accountCreate) => {
			const body = AccountsCreateSchema.parse(accountCreate);
			const accessToken = findAccessToken();

			const response = await fetch(baseUrl, {
				method: HTTPVerbs.POST,
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: formatAccessToken(accessToken),
				},
				signal,
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = AccountEndpointSchema.parse(result);
			return validatedResult;
		},

		movementCreate: async ({ accountId, movementCreate }) => {
			const _accountId = IdSchema.parse(accountId);
			const body = MovementCreateSchema.parse(movementCreate);
			const accessToken = findAccessToken();

			const response = await fetch(`${baseUrl}/${_accountId}`, {
				method: HTTPVerbs.POST,
				headers: { 'Content-Type': 'application/json', accept: 'application/json' },
				Authorization: formatAccessToken(accessToken),
				signal,
				body: JSON.stringify(body),
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = AccountsIdPOSTEndpointSchema.parse(result);
			return validatedResult;
		},

		findById: async (accountId) => {
			const _accountId = IdSchema.parse(accountId);
			const accessToken = findAccessToken();

			const response = fetch(`${baseUrl}/${_accountId}`, {
				method: HTTPVerbs.GET,
				headers: { accept: 'application/json' },
				Authorization: formatAccessToken(accessToken),
				signal,
			});

			const result = await response.json();

			if (!response.ok) {
				throw new Error(result.error);
			}

			const validatedResult = AccountEndpointSchema.parse(result);
			return validatedResult;
		},
	};
};
