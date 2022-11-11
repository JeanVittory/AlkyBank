export const authQueryKeys = {
	auth: ['AUTH'],
	validateToken: () => [...authQueryKeys.auth, 'VALIDATE_TOKEN'],
};
