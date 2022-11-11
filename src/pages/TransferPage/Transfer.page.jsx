import React from 'react';
import { LayoutPage } from 'src/components/LayoutPage';
import { Heading } from 'src/components/Heading';
import EmailTransfer from './EmailTransfer';
import AccountTransfer from './AccountTransfer';

const TransferPage = () => {
	return (
		<LayoutPage>
			<Heading size="headline3" className=" text-ct-primary-600 text-center mb-10">
				{' '}
				Transfer
			</Heading>
			<div className="mt-5 md:mt-0 m-5 flex flex-col lg:flex-row justify-around">
				<div className="items-center flex flex-col text-center justify-center">
					<Heading size="headline4">Deposit to an account ID</Heading>
					<AccountTransfer />
				</div>
				<div className="items-center mt-5 md:mt-0 flex flex-col text-center justify-center">
					<Heading size="headline4">Deposit to an user email</Heading>
					<EmailTransfer />
				</div>
			</div>
		</LayoutPage>
	);
};

export default TransferPage;
