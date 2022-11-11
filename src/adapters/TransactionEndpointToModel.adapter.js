import { Transaction } from 'src/models/transaction.model';

export function TransactionEndpointToModel(TransactionEndpoint) {
	return Transaction.create(TransactionEndpoint);
}
