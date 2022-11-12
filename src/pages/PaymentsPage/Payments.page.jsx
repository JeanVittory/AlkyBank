import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import { queryClient } from 'src';
import { MovementFormToCreate } from 'src/adapters/MovementFormToCreate.adapter';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { Select } from 'src/components/Select';
import { Input } from 'src/components/Input/Input';
import { currencyCodeDefault } from 'src/models/currencyCodeDefault';
import { currencyList } from 'src/models/currencyList';
import { MovementType } from 'src/models/movementType.model';
import { transactionsQueryKeys } from 'src/models/transactions.queryKeys';
import { AccounstRepository } from 'src/repositories/accounts.repository';

const initialState = {
	type: MovementType.payment,
	concept: '',
	currencyCode: currencyCodeDefault,
	isTransference: false,
	amount: 0,
};
const fieldNames = Object.fromEntries(Object.entries(initialState).map(([key]) => [key, key]));

export default function PaymentsPage() {
	const user = useSelector((state) => state.auth.user);
	const [formValues, setFormValues] = React.useState(initialState);
	const { mutate: onSubmit } = useMutation(
		async (event) => {
			event.preventDefault();
			const newTopUp = MovementFormToCreate({ ...formValues, amount: parseInt(formValues.amount) });

			const result = await AccounstRepository().movementCreate({ accountId: user.accountId, movementCreate: newTopUp });
			return result;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: transactionsQueryKeys.transactions });
			},
		},
	);

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormValues((state) => ({ ...state, [name]: value }));
	};

	return (
		<main className="mx-auto w-full max-w-screen-xl px-4 py-10 xl:px-0">
			<Heading className="mb-10 text-ct-neutral-dark-700">Payments</Heading>
			<div className="flex gap-4 items-center">
				<img alt="payments-image" src="/payments-page.svg" className="max-w-[500px]"/>
				<form onSubmit={onSubmit} className="mx-auto flex flex-col gap-4 max-w-[500px] flex-1">
					<Select
						label="Select a currency"
						onChange={onChange}
						name={fieldNames.currencyCode}
						value={formValues.currencyCode}
					>
						{currencyList.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</Select>

					<Input
						label="Amount"
						type="number"
						max="5000"
						onChange={onChange}
						name={fieldNames.amount}
						value={formValues.amount}
					/>

					<div className="grid">
						<label htmlFor="concept">Concept</label>
						<textarea onChange={onChange} className="border" name="concept" id="concept" cols="30" rows="4"></textarea>
					</div>

					<Button className="" type="submit">
						Pay now
					</Button>
				</form>
			</div>
		</main>
	);
}
