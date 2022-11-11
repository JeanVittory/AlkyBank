export class Transaction {
	constructor({ id, amount, concept, date, type, accountId, userId, to_account_id, createdAt, updatedAt }) {
		this.id = id;
		this.amount = amount;
		this.concept = concept;
		this.date = date;
		this.type = type;
		this.accountId = accountId;
		this.userId = userId;
		this.to_account_id = to_account_id;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;

		const { conceptDecoded, currencyCode, isTransference } = this.parseConcept(concept);
		this.conceptDecoded = conceptDecoded;
		this.currencyCode = currencyCode;
		this.isTransference = isTransference;
	}

	static create(props) {
		return new Transaction(props);
	}

	parseConcept(conceptEncoded) {
		const { concept, currencyCode, isTransference } = JSON.parse(conceptEncoded);
		return { conceptDecoded: concept, currencyCode, isTransference };
	}
}

