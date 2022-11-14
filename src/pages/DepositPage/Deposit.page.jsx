import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { queryClient } from 'src';
import { MovementFormToCreate } from 'src/adapters/MovementFormToCreate.adapter';
import { Alert } from 'src/components/Alert';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { MovementTopupFormCreateOrEdit } from 'src/components/MovementTopupFormCreateOrEdit/MovementTopupFormCreateOrEdit';
import { Skeleton } from 'src/components/Skeleton';
import { Text } from 'src/components/Text';
import { currencyCodeDefault } from 'src/models/currencyCodeDefault';
import { MovementType } from 'src/models/movementType.model';
import { transactionsQueryKeys } from 'src/models/transactions.queryKeys';
import { AccounstRepository } from 'src/repositories/accounts.repository';
import aos from 'aos';
import { useEffect } from 'react';

function DepositPageSkeleton() {
	return (
		<div className="mx-auto w-full max-w-screen-xl py-11 px-4 md:py-14 xl:px-0">
			<Skeleton className="mb-10 h-[37px] rounded md:mb-12 md:h-[49px]" />

			<div className="grid gap-5 md:grid-cols-[1fr_auto_1fr]">
				<div className="grid grid-rows-[auto_1fr]">
					<Skeleton className="h-[263px] rounded sm:h-[153px] md:h-[230px] md:max-w-lg lg:h-[168px]" />

					<Skeleton className="mt-8 hidden h-[300px] w-full max-w-xs place-self-start md:block md:h-[360px] xl:max-w-md" />
				</div>

				<div />

				<Skeleton className="mx-auto h-[439px] w-full max-w-sm rounded p-6 md:h-[471px]" />
			</div>
		</div>
	);
}

export default function DepositPage() {
	const isLoadedMovementsInfo = useSelector((state) => state.movements.isInfoLoaded);
	const user = useSelector((state) => state.auth.user);

	const [searchParams] = useSearchParams();

	const movementId = searchParams.get('movementId');

	const { mutate: onQuickCharge } = useMutation(
		async (amount) => {
			const newTopUp = MovementFormToCreate({
				isTransference: false,
				type: MovementType.topup,
				amount: amount,
				concept: 'Quick charge',
				currencyCode: currencyCodeDefault,
			});

			const result = await AccounstRepository().movementCreate({ accountId: user.accountId, movementCreate: newTopUp });
			return result;
		},
		{
			onSuccess: () => {
				toast.success('Charged successfully');
				queryClient.invalidateQueries({ queryKey: transactionsQueryKeys.transactions });
			},
			onError: () => {
				toast.error('Something went wrong, try again later');
			},
		},
	);

	useEffect(() => {
		aos.init();
	}, []);

	if (!isLoadedMovementsInfo) {
		return <DepositPageSkeleton />;
	}

	return (
		<main className="mx-auto w-full max-w-screen-xl px-4 py-10 xl:px-0">
			<Heading data-aos="fade-right" className="mb-10 text-ct-neutral-dark-700">
				Deposit
			</Heading>

			<div className="grid gap-5 px-4 md:grid-cols-[1fr_auto_1fr]">
				<div className="grid grid-rows-[auto_1fr]">
					<fieldset
						data-aos="fade-right"
						className="grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-4 rounded border border-ct-secondary-400 p-4 shadow-md md:max-w-lg"
					>
						<Text as="legend" className=" px-4">
							Quick deposit
						</Text>
						{[100, 200, 300, 400, 500, 1000, 1500, 2000].map((amount) => (
							<Alert
								key={amount}
								trigger={
									<Button colorScheme="tertiary" className="whitespace-nowrap">
										{amount} {currencyCodeDefault}
									</Button>
								}
								title={
									<Heading size="headline2" className="text-ct-special1-900">
										Are you sure?
									</Heading>
								}
								description={
									<Text>
										You want to deposit {currencyCodeDefault} {amount}
									</Text>
								}
								cancelButton={
									<Button colorScheme="danger" variant="ghost">
										Cancel
									</Button>
								}
								confirmButton={
									<Button colorScheme="success" variant="ghost" onClick={() => onQuickCharge(amount)}>
										Accept
									</Button>
								}
							/>
						))}
					</fieldset>

					<img
						data-aos="fade-right"
						src="./topup.webp"
						alt="saving money"
						className="mx-auto mt-8 hidden max-w-xs place-self-start md:block xl:max-w-md"
					/>
				</div>

				<hr className="h-full justify-center border-l border-ct-special1-700/30 md:w-[1px]" />

				<MovementTopupFormCreateOrEdit movementId={movementId} />
			</div>
		</main>
	);
}

