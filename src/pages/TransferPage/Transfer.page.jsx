import React from 'react';
import { Heading } from 'src/components/Heading';
import EmailTransfer from './EmailTransfer';
import AccountTransfer from './AccountTransfer';
import aos from 'aos';

const TransferPage = () => {
	React.useEffect(() => {
		aos.init();
	}, []);

	return (
		<main data-aos="fade-down" className="flex flex-col items-center justify-center">
			<Heading size="headline3" className="mb-10 mt-10 text-center text-ct-primary-600">
				{' '}
				Transfer
			</Heading>
			<div className="m-5 mt-5 flex flex-col justify-around divide-y divide-black md:mt-0 lg:flex-row  lg:divide-x lg:divide-y-0">
				<div className="mt-5  flex flex-col items-center justify-center text-center">
					<Heading size="headline4">Deposit to an account ID</Heading>
					<AccountTransfer />
				</div>

				<div className="mt-5 flex flex-col items-center justify-center text-center md:mt-0">
					<Heading className="mt-5" size="headline4">
						Deposit to an user email
					</Heading>
					<EmailTransfer />
				</div>
			</div>
		</main>
	);
};

export default TransferPage;

