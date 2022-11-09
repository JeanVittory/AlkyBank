
import { LayoutPage } from 'src/components/LayoutPage';
import { Heading } from 'src/components/Heading';
import balanceImg from '../../assets/balance/balance.svg';
import cargasImg from '../../assets/balance/cargas.svg';
import paymentsImg from '../../assets/balance/payments.svg';
import Card from '../../components/Cards/Balance'

export default function BalancePage() {
	const data = [
		{
			title: 'Balance',
			image: balanceImg,
			amount: 1000
		},
		{
			title: 'Cargas',
			image: cargasImg,
			amount: 5000
		},
		{
			title: 'Pagos',
			image: paymentsImg,
			amount: 4000
		},
	]

	return (
		<LayoutPage>
			<Heading className="m-auto text-ct-primary-600 "> Tu Balance</Heading>
			<section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">

				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{data.map(card=> 
						<Card key={card.title} title={card.title} image={card.image} amount={card.amount}/>
						)}


				</div>
			</section>
		</LayoutPage>)
}
