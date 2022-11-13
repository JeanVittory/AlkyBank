import React from 'react';
import { currencyCodeDefault } from 'src/models/currencyCodeDefault';
import { MovementType } from 'src/models/movementType.model';

export function useCalculateBalance(movementList = []) {
	const [currencyCode, setCurrencyCode] = React.useState(currencyCodeDefault);
	const movementListBasedOnCurrency = movementList.filter((movement) => movement.currencyCode === currencyCode);
	const paymentsList = movementListBasedOnCurrency.filter((movement) => movement.type === MovementType.payment);
	const topupList = movementListBasedOnCurrency.filter((movement) => movement.type === MovementType.topup);
	const paymentSum = paymentsList.reduce((prev, curr) => prev + curr.amount, 0);
	const topupSum = topupList.reduce((prev, curr) => prev + curr.amount, 0);

	const onChangeCurrency = (e) => {
		const { value } = e.target;
		setCurrencyCode(value);
	};
	const changeCurrencyImperative = (currency) => {
		setCurrencyCode(currency);
	};

	return {
		balance: topupSum - paymentSum,
		paymentSum,
		topupSum,
		currencyCode,
		onChangeCurrency,
		changeCurrencyImperative,
		movementListBasedOnCurrency,
	};
}
