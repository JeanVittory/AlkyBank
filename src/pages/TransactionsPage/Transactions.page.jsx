import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { Input } from 'src/components/Input/Input';
import { MovementCard } from 'src/components/MovementCard';
import { Pagination } from 'src/components/Pagination';
import { Select } from 'src/components/Select';
import { Skeleton } from 'src/components/Skeleton';
import { Text } from 'src/components/Text';
import { currencyList } from 'src/models/currencyList';
import { MovementType } from 'src/models/movementType.model';
import { range } from 'src/utils/range';
import { useMovementsFilters } from './useMovementsFilters';
import aos from 'aos';

const TransactionsSkeleton = () => {
	return (
		<div className="mx-auto w-full max-w-screen-xl px-4 py-10 xl:px-0">
			<Skeleton className="mb-10 h-[40px] rounded md:h-[69px]" />

			<div className="grid gap-6 md:grid-cols-[auto_1fr]">
				<Skeleton className="h-[388px] w-full rounded md:h-[413px] md:w-[289px]" />

				<div className="mt-8 md:mt-0">
					<Skeleton className="ml-auto h-[40px] w-full rounded sm:max-w-md md:h-[50px]" />

					<div className="my-10 grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4">
						{range(10).map((v) => (
							<Skeleton key={v} className="h-[200px] w-full rounded md:h-[250px]" />
						))}
					</div>

					<Skeleton className="ml-auto h-[40px] w-full rounded sm:max-w-md md:h-[50px]" />
				</div>
			</div>
		</div>
	);
};

export default function TransactionsPage() {
	const movementList = useSelector((state) => state.movements.movementList);
	const currencyListStored = useSelector((state) => state.movements.currencyList);
	const isLoadedMovementsInfo = useSelector((state) => state.movements.isInfoLoaded);
	const _currencyList = currencyListStored.length > 0 ? currencyListStored : currencyList;

	React.useEffect(() => {
		aos.init();
	}, []);

	const {
		result: transactionListPaginated,
		filterFields,
		filterFieldsNames,
		isSearching,
		totalPages,
		currentPage,
		itemsPerPage,
		onFilterFieldChange,
		onItemsPerPageChange,
		changePage,
		clearFilters,
	} = useMovementsFilters(movementList);
	const [showConcept, setShowConcept] = React.useState(true);

	const isSomeResult = !!transactionListPaginated.length;

	if (!isLoadedMovementsInfo) {
		return <TransactionsSkeleton />;
	}

	return (
		<main className="mx-auto w-full max-w-screen-xl px-4 py-10 xl:px-0">
			<Heading className="mb-10 text-ct-neutral-dark-700">Movements</Heading>

			<div className="grid gap-6 md:grid-cols-[auto_1fr]">
				<fieldset
					data-aos="fade-right"
					className="grid h-min gap-6 rounded border border-ct-neutral-dark-100 px-4 pt-4 pb-4 shadow-md md:sticky md:top-12"
				>
					<Text as="legend" className="px-2 font-bold tracking-wider">
						Filters
					</Text>

					<Select
						colorScheme="tertiary"
						label="Currency"
						name={filterFieldsNames.currency}
						id=""
						value={filterFields.currency}
						className=""
						onChange={onFilterFieldChange}
					>
						{_currencyList.map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</Select>

					<Select
						colorScheme="tertiary"
						label="Operation"
						name={filterFieldsNames.movementType}
						id=""
						className=""
						value={filterFields.movementType}
						onChange={onFilterFieldChange}
					>
						<option value="">All</option>
						{Object.values(MovementType).map((c) => (
							<option key={c} value={c}>
								{c}
							</option>
						))}
					</Select>

					<Input
						colorScheme="tertiary"
						label="Concept"
						type="text"
						name={filterFieldsNames.conceptFilter}
						value={filterFields.conceptFilter}
						onChange={onFilterFieldChange}
					/>

					<div className="!mr-auto">
						<Input
							label="Show concepts"
							labelPosition="left"
							colorScheme="secondary"
							type="checkbox"
							name="Show all concepts"
							checked={showConcept}
							onChange={() => setShowConcept((s) => !s)}
						/>
					</div>

					<Button onClick={clearFilters} colorScheme="tertiary" className="md:row-start-1">
						Clear filters
					</Button>
				</fieldset>

				<div>
					<Text
						className={`${
							!isSomeResult ? 'visible' : 'invisible hidden'
						} mx-auto mt-10 rounded border border-ct-secondary-400 bg-ct-tertiary-200/20 p-4 text-center text-xl font-medium`}
					>
						{isSearching ? 'There are not results for your search' : 'There are no movements yet'}
					</Text>

					<div className={`${isSomeResult ? 'visible' : 'invisible'} mt-8 transition-all duration-150 md:mt-0`}>
						<Pagination
							className="ml-auto w-full sm:max-w-md"
							totalPages={totalPages}
							currentPage={currentPage}
							onChangePage={changePage}
							changeItemsPerPage={onItemsPerPageChange}
							itemsPerPag={itemsPerPage}
						/>

						<ol
							data-aos="fade-left"
							className="my-10 grid grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-4"
						>
							{transactionListPaginated?.map((movement) => (
								<motion.li
									key={movement.id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									transition={{ duration: 0.5 }}
								>
									<MovementCard {...movement} showConcept={showConcept} />
								</motion.li>
							))}
						</ol>

						<Pagination
							className="mx-auto max-w-md sm:mr-0"
							totalPages={totalPages}
							currentPage={currentPage}
							onChangePage={changePage}
							changeItemsPerPage={onItemsPerPageChange}
							itemsPerPag={itemsPerPage}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
