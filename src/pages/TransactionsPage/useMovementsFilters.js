import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { currencyCodeDefault } from 'src/models/currencyCodeDefault';

const initialPage = 1;

const filtersInitialState = {
	currency: currencyCodeDefault,
	movementType: '',
	conceptFilter: '',
};

export function useMovementsFilters(transactionList = [], itemsPerPage = 10) {
	const [getParam, setParam] = useSearchParams();
	const perPageParam = parseInt(getParam.get('perPage'));
	const pageParam = parseInt(getParam.get('page'));
	const filtersParam = JSON.parse(getParam.get('filters'));
	const [filterFields, setFilterFields] = React.useState(filtersParam || filtersInitialState);
	const [_itemsPerPage, setItemsPerPage] = React.useState(perPageParam || itemsPerPage);
	const [currentPage, setCurrentPage] = React.useState(pageParam || initialPage);
	const filterFieldsNames = Object.fromEntries(Object.entries(filtersInitialState).map(([key]) => [key, key]));
	const isSearching = !!filtersParam;

	const onFilterFieldChange = (e) => {
		const { name = '', value = '' } = e.target;
		setFilterFields((s) => ({ ...s, [name]: value }));
		setCurrentPage(initialPage);
		setParam((s) => ({ ...s, page: initialPage, filters: JSON.stringify({ ...filterFields, [name]: value }) }));
	};

	const onItemsPerPageChange = (e) => {
		const { value = '' } = e.target;
		const perPage = parseInt(value, 10);
		setItemsPerPage(perPage);
		setCurrentPage(initialPage);
		setParam((s) => ({
			...s,
			perPage,
			page: initialPage,
			filters: JSON.stringify({ ...filterFields }),
		}));
	};

	const onChangePage = (page) => {
		setCurrentPage(page);
		setParam((s) => ({ ...s, perPage: _itemsPerPage, page: page, filters: JSON.stringify({ ...filterFields }) }));
	};

	const clearFilters = () => {
		setFilterFields(filtersInitialState);
		setParam({});
	};

	const transactionListFiltered = transactionList
		?.filter((t) => t.currencyCode === filterFields.currency)
		.filter((t) => (filterFields.movementType ? t.type === filterFields.movementType : t))
		.filter((t) =>
			filterFields.conceptFilter
				? t.conceptDecoded.toLowerCase().includes(filterFields.conceptFilter.toLowerCase())
				: t,
		);

	const totalPages = Math.ceil(transactionListFiltered.length / _itemsPerPage);
	const sliceStartIndex = currentPage * _itemsPerPage - _itemsPerPage;
	const sliceEndIndex = sliceStartIndex + _itemsPerPage;

	const transactionListPaginated = transactionListFiltered?.slice(sliceStartIndex, sliceEndIndex);

	return {
		result: transactionListPaginated,
		isSearching,
		filterFields,
		filterFieldsNames,
		totalPages,
		currentPage,
		itemsPerPage: _itemsPerPage,
		onFilterFieldChange,
		clearFilters,
		changePage: onChangePage,
		onItemsPerPageChange,
	};
}
