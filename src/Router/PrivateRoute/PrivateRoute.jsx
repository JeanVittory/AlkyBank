import { useInfiniteQuery } from '@tanstack/react-query';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { movementsActions } from 'src/features/movements/movementsSlice';
import { useAuthentication } from 'src/hooks/useAuthentication';
import { transactionsQueryKeys } from 'src/models/transactions.queryKeys';
import { AuthRepository } from 'src/repositories/auth.repository';
import { TransactionsRepository } from 'src/repositories/transactions.repository';
import { webRoutes } from 'src/utils/web.routes';

export const PrivateRoute = ({ children }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { isAuthenticated, isAuthenticating } = useAuthentication(AuthRepository);

	const {
		data: movementPageList,
		hasNextPage,
		isRefetching,
		fetchNextPage,
		isSuccess,
	} = useInfiniteQuery(
		{
			queryKey: transactionsQueryKeys.transactions,
			queryFn: async ({ pageParam = '/transactions/?page=0', signal }) => {
				const result = await TransactionsRepository(signal).findAllPaginated({ page: pageParam });
				return result;
			},
			getNextPageParam: (lastPage) => lastPage.nextPage,
		},
		{ enabled: isAuthenticated },
	);

	const hasOtherPageParam = !!movementPageList?.pageParams.at(-1);

	React.useEffect(() => {
		if (!isAuthenticated && !isAuthenticating) {
			navigate(webRoutes.login, { replace: true });
		}
	}, [isAuthenticated, isAuthenticating]);

	React.useEffect(() => {
		if (hasNextPage || (hasNextPage && hasOtherPageParam)) {
			fetchNextPage();
			return;
		}

		if (isSuccess && !hasNextPage) {
			dispatch(movementsActions.setInfoIsLoaded());
		}

		if (isRefetching || !isSuccess || hasNextPage) return;

		const transactionListMerged = movementPageList?.pages
			.map((page) => page.data.map((movement) => ({ ...movement })))
			.flat();
		const currencyCodesMerged = Array.from(new Set(movementPageList?.pages.map((page) => page.currencyCode).flat()));

		dispatch(movementsActions.loadMovements(transactionListMerged));
		dispatch(movementsActions.loadCurrencies(currencyCodesMerged));
		dispatch(movementsActions.setInfoIsLoaded());
	}, [hasNextPage, hasOtherPageParam, isSuccess, isRefetching]);

	if (!isAuthenticated || isAuthenticating) {
		return <div />;
	}

	return <>{children}</>;
};
