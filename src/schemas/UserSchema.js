import z from 'zod';

export const UserEndpointSchema = z.object({
	id: z.string(),
	createdAt: z.string(),
	email: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
	points: z.number(),
	roleId: z.number(),
	updatedAt: z.string(),
});

export const UsersPOSTEndpointSchema = z.object({
	email: z.string(),
	first_name: z.string(),
	last_name: z.string(),
	password: z.string(),
	points: z.number().default(0),
	roleId: z.number().default(1),
});

