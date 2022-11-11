import React from 'react';
import { currencyCodeDefault } from 'src/models/currencyCodeDefault';

const initialPage = 1;
const initialState = {
	currency: currencyCodeDefault,
	movementType: '',
	conceptFilter: '',
};

export function useMovementsFilters(transactionList = [], itemsPerPage = 10) {
	const [filterFields, setFilterFields] = React.useState(initialState);
	const [_itemsPerPage, setItemsPerPage] = React.useState(itemsPerPage);
	const [currentPage, setCurrentPage] = React.useState(initialPage);

	const filterFieldsNames = Object.fromEntries(Object.entries(initialState).map(([key]) => [key, key]));

	const onFilterFieldChange = (e) => {
		const { name = '', value = '' } = e.target;
		setFilterFields((s) => ({ ...s, [name]: value }));
		setCurrentPage(initialPage);
	};

	const onItemsPerPageChange = (e) => {
		const { value = '' } = e.target;
		setItemsPerPage(parseInt(value, 10));
		setCurrentPage(initialPage);
	};

	const clearFilters = () => {
		setFilterFields(initialState);
	};

	const transactionListFiltered = transactionList
		?.filter((t) => t.currencyCode === filterFields.currency)
		.filter((t) => (filterFields.movementType ? t.type === filterFields.movementType : t))
		.filter((t) => (filterFields.conceptFilter ? t.conceptDecoded.includes(filterFields.conceptFilter) : t));

	const totalPages = Math.ceil(transactionListFiltered.length / _itemsPerPage);
	const sliceStartIndex = currentPage * _itemsPerPage - _itemsPerPage;
	const sliceEndIndex = sliceStartIndex + _itemsPerPage;

	const transactionListPaginated = transactionListFiltered?.slice(sliceStartIndex, sliceEndIndex);

	return {
		result: transactionListPaginated,
		filterFields,
		filterFieldsNames,
		totalPages,
		currentPage,
		itemsPerPage: _itemsPerPage,
		onFilterFieldChange,
		clearFilters,
		changePage: setCurrentPage,
		onItemsPerPageChange,
	};
}
