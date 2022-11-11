import { IdSchema } from 'src/schemas/id.schema';
import { z } from 'zod';

export const userEditSchema = z.object({
	first_name: z.string().min(1),
	last_name: z.string().min(1),
	email: z.string().min(1),
	password: z.string(),
	roleId: IdSchema,
});
