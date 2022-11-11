import { LayoutPage } from 'src/components/LayoutPage';
import { Heading } from 'src/components/Heading';
import balanceImg from 'src/assets/balance/balance.svg';
import cargasImg from 'src/assets/balance/cargas.svg';
import paymentsImg from 'src/assets/balance/payments.svg';
import { CardBalance } from 'src/components/Cards';

export default function BalancePage() {
	const data = [
		{
			title: 'Balance',
			image: balanceImg,
			amount: 1000,
		},
		{
			title: 'Cargas',
			image: cargasImg,
			amount: 5000,
		},
		{
			title: 'Pagos',
			image: paymentsImg,
			amount: 4000,
		},
	];

	return (
		<LayoutPage>
			<Heading className="m-auto text-ct-primary-600" size="headline2">
				Tu Balance
			</Heading>

			<section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-4">
				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
					{data.map((card) => (
						<CardBalance key={card.title} title={card.title} image={card.image} amount={card.amount} />
					))}
				</div>
			</section>
		</LayoutPage>
	);
}
