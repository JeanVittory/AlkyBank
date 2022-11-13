import { useSelector } from 'react-redux';
import { BalanceCard } from 'src/components/BalanceCard';
import { Heading } from 'src/components/Heading';
import { Select } from 'src/components/Select';
import { Skeleton } from 'src/components/Skeleton';
import { useCalculateBalance } from 'src/hooks/useCalculateBalance';
import { range } from 'src/utils/range';
import { webRoutes } from 'src/utils/web.routes';
import { currencyList } from 'src/models/currencyList';
import { MovementType } from 'src/models/movementType.model';

function BalancePageSkeleton() {
	return (
		<div className="mx-auto w-full max-w-screen-xl py-11 px-4 md:py-14 xl:px-0">
			<div className="mb-12 flex w-full flex-col gap-11 md:gap-14 lg:flex-row">
				<Skeleton className="h-[34px] w-full rounded md:h-[49px]" />

				<div className="mt-auto w-full sm:max-w-xs lg:ml-auto">
					<Skeleton className="mb-2 h-[15px] w-16 rounded" />
					<Skeleton className="h-[33px] w-full rounded" />
				</div>
			</div>

			<div className="mx-auto h-max w-full max-w-4xl">
				<div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-6">
					{range(3).map((v) => (
						<Skeleton key={v} className="h-[344px] w-full rounded-lg" />
					))}
				</div>
			</div>
		</div>
	);
}

export default function BalancePage() {
	const movementList = useSelector((state) => state.movements.movementList);
	const isInfoLoaded = useSelector((state) => state.movements.isInfoLoaded);
	const currencyListStored = useSelector((state) => state.movements.currencyList);
	const _currencyList = currencyListStored.length > 0 ? currencyListStored : currencyList;

	const { balance, paymentSum, topupSum, currencyCode, onChangeCurrency } = useCalculateBalance(movementList);
	const topupSearch = encodeURIComponent(JSON.stringify({ currency: currencyCode, movementType: MovementType.topup }));
	const paymentSearch = encodeURIComponent(
		JSON.stringify({ currency: currencyCode, movementType: MovementType.payment }),
	);

	const data = [
		{
			title: 'Balance',
			image: '/balance-page.svg',
			amount: balance,
		},
		{
			title: 'Topup',
			image: '/deposit-page.svg',
			amount: topupSum,
			link: `${webRoutes.transactions}?filters=${topupSearch}`,
		},
		{
			title: 'Payment',
			image: 'payments-page.svg',
			amount: paymentSum,
			link: `${webRoutes.transactions}?filters=${paymentSearch}`,
		},
	];

	if (!isInfoLoaded) {
		return <BalancePageSkeleton />;
	}

	return (
		<main className="mx-auto w-full max-w-screen-xl px-4 py-10 xl:px-0">
			<header className="mb-12 flex w-full flex-col gap-10 lg:flex-row">
				<Heading data-aos="fade-right" className="whitespace-nowrap text-ct-neutral-dark-700">
					Balance
				</Heading>

				<div className="mt-auto w-full sm:max-w-xs lg:ml-auto">
					<Select label="Currency" onChange={onChangeCurrency} value={currencyCode} colorScheme="secondary">
						{_currencyList.map((currency) => (
							<option key={currency} value={currency}>
								{currency}
							</option>
						))}
					</Select>
				</div>
			</header>

			<div className="mx-auto h-max w-full max-w-4xl">
				<ol className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,16rem),1fr))] gap-6">
					{data.map((card) => (
						<li key={card.title} className="contents">
							<BalanceCard {...card} currency={currencyCode} />
						</li>
					))}
				</ol>
			</div>
		</main>
	);
}
