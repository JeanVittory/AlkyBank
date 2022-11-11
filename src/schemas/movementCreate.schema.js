import { MovementType } from 'src/models/movementType.model';
import z from 'zod';

export const MovementCreateSchema = z.object({
	type: z.nativeEnum(MovementType),
	concept: z.string(),
	amount: z.number().min(1),
});
