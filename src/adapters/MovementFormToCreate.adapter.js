import { MovementFormSchema } from 'src/schemas/movementForm.schema';

export function MovementFormToCreate(movementForm) {
	const _movementForm = MovementFormSchema.parse(movementForm);
	return {
		..._movementForm,
		concept: JSON.stringify({
			concept: _movementForm.concept,
			currencyCode: _movementForm.currencyCode,
			isTransference: _movementForm.isTransference,
		}),
	};
}
