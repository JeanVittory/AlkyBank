import { useMutation, useQuery } from '@tanstack/react-query';
import aos from 'aos';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { queryClient } from 'src';
import { MovementFormToCreate } from 'src/adapters/MovementFormToCreate.adapter';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { Input } from 'src/components/Input';
import { Select } from 'src/components/Select';
import { Text } from 'src/components/Text';
import { useCalculateBalance } from 'src/hooks/useCalculateBalance';
import { currencyCodeDefault } from 'src/models/currencyCodeDefault';
import { currencyList } from 'src/models/currencyList';
import { MovementType } from 'src/models/movementType.model';
import { transactionsQueryKeys } from 'src/models/transactions.queryKeys';
import { AccounstRepository } from 'src/repositories/accounts.repository';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { webRoutes } from 'src/utils/web.routes';

const formValuesInitialState = {
	type: MovementType.payment,
	concept: '',
	currencyCode: currencyCodeDefault,
	isTransference: false,
	amount: '',
};

const fieldNames = Object.fromEntries(Object.entries(formValuesInitialState).map(([key]) => [key, key]));
const notEnoughFunds = 'NOT_ENOUGH_FUNDS';

export const MovementPaymentFormCreateOrEdit = ({ movementId }) => {
	const user = useSelector((state) => state.auth.user);
	const movementList = useSelector((state) => state.movements.movementList);
	const { balance, changeCurrencyImperative } = useCalculateBalance(movementList);
	const [formValues, setFormValues] = React.useState(formValuesInitialState);
	const navigate = useNavigate();
	const isEditing = !!movementId;

	const { data: movementResponse } = useQuery(
		transactionsQueryKeys.transactionsFindById(movementId),
		async ({ signal }) => {
			const movement = await TransactionsRepository(signal).findById(movementId);
			return movement;
		},
		{ enabled: isEditing },
	);

	const { mutate: onSubmit } = useMutation(
		async (event) => {
			event.preventDefault();
			const amount = parseInt(formValues.amount, 10);
			if (balance < amount) {
				return notEnoughFunds;
			}
			const newTopUp = MovementFormToCreate({ ...formValues, amount });
			const result = await AccounstRepository().movementCreate({ accountId: user.accountId, movementCreate: newTopUp });
			return result;
		},
		{
			onSuccess: (data) => {
				if (data === notEnoughFunds) {
					return toast.warning("You doesn't have enough money to complete this transaction");
				}
				toast.success('Payment saved');
				setFormValues({ ...formValuesInitialState });
				queryClient.invalidateQueries({ queryKey: transactionsQueryKeys.transactions });
			},
			onError: () => {
				toast.error('Something went wrong, try again');
			},
		},
	);

	const isReadyToSubmitEdit = isEditing && movementResponse;
	const isNotAllowedToEdit = movementResponse?.type === MovementType.topup || movementResponse?.isTransference;

	const { mutate: onSubmitEdited } = useMutation(
		async (event) => {
			event.preventDefault();
			const amount = parseInt(formValues.amount, 10);
			const formValuesParsed = MovementFormToCreate({ ...formValues, amount });
			const paymentEdited = { ...movementResponse, ...formValuesParsed };
			const result = await TransactionsRepository().edit(paymentEdited);
			return result;
		},
		{
			enabled: isReadyToSubmitEdit,
			onSuccess: () => {
				toast.success('Changes saved');
				navigate(webRoutes.payments, { replace: true });
				setFormValues({ ...formValuesInitialState });
				queryClient.invalidateQueries({ queryKey: transactionsQueryKeys.transactions });
			},
			onError: () => {
				toast.error('Something went wrong, try again');
			},
		},
	);

	const _onSubmit = isEditing ? onSubmitEdited : onSubmit;

	const onChange = (e) => {
		const { name, value } = e.target;
		setFormValues((state) => ({ ...state, [name]: value }));
		if (name !== fieldNames.currencyCode) return;
		changeCurrencyImperative(value);
	};

	React.useEffect(() => {
		aos.init();
	});

	React.useEffect(() => {
		if (!isEditing || !movementResponse) return;

		setFormValues({ ...movementResponse, concept: movementResponse?.conceptDecoded });
		changeCurrencyImperative(movementResponse.currencyCode);
	}, [isEditing, movementResponse]);

	return (
		<form
			data-aos="fade-left"
			onSubmit={_onSubmit}
			className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded border border-ct-secondary-500/50 p-6 shadow-md shadow-ct-neutral-light-100 md:h-min"
		>
			<Heading as="h2" size="headline3" className="mb-2 text-center text-ct-neutral-dark-700">
				{isEditing ? 'Edit payment' : 'Send a payment'}
			</Heading>

			<Text className={` ${isNotAllowedToEdit ? 'visible' : 'invisible'} text-center text-sm text-ct-danger-300`}>
				This operation cannot be modified
			</Text>

			<Select
				colorScheme="secondary"
				disabled={isEditing || isNotAllowedToEdit}
				label="Currency"
				onChange={onChange}
				name={fieldNames.currencyCode}
				value={formValues.currencyCode}
				required
			>
				{currencyList.map((c) => (
					<option key={c} value={c}>
						{c}
					</option>
				))}
			</Select>

			<Input
				colorScheme="secondary"
				disabled={isEditing || isNotAllowedToEdit}
				label="Amount"
				type="number"
				placeholder="0"
				max="5000"
				min="1"
				onChange={onChange}
				name={fieldNames.amount}
				value={formValues.amount}
				required
			/>

			<div className="grid">
				<Text as="label" htmlFor="concept" className="font-medium text-ct-neutral-medium-700">
					Concept
				</Text>
				<Text
					maxLength={150}
					minLength={1}
					as="textarea"
					placeholder="A short description"
					disabled={isNotAllowedToEdit}
					onChange={onChange}
					name={fieldNames.concept}
					value={formValues.concept}
					className="border p-2 outline-ct-special1-500"
					id="concept"
					cols="30"
					rows="4"
					required
				/>
			</div>

			<Button className="" type="submit" disabled={(isEditing && !isReadyToSubmitEdit) || isNotAllowedToEdit}>
				{isEditing ? 'Save changes' : 'Pay now'}
			</Button>
		</form>
	);
};
