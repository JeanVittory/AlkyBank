import { Heading } from 'src/components/Heading';
import { useEffect } from 'react';
import { TransactionsRepository } from 'src/repositories/transactions.repository';

export default function HomePage() {
	useEffect(() => {
		const { findAllPaginated } = TransactionsRepository();
		findAllPaginated({ page: 1 })
			.then((response) => console.log(response))
			.catch((error) => console.log(error));
	}, []);

	return (
		<div className="flex  w-full  place-content-center px-4 py-40">
			<header>
				<img src={'./alkemy_logo.svg'} className="mx-auto max-w-md" alt="logo" />
				<Heading as="h3" className="text-center">
					Bienvenido a AlkyBank
				</Heading>
			</header>
		</div>
	);
}

