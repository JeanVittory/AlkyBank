import z from 'zod';

export const UsersCreateSchema = z.object({
	email: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
	points: z.number().default(0),
	roleId: z.number().default(1),
});
