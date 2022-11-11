import z from 'zod';
import { TransactionEndpointSchema } from './transactionEndpoint.schema';

export const TransactionGETEndpointSchema = z.object({
	data: z.array(TransactionEndpointSchema),
	nextPage: z.string().nullable(),
	previousPage: z.string().nullable(),
});
