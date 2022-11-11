import React, { useState, useEffect } from 'react';
import { LayoutPage } from 'src/components/LayoutPage';
import { Heading } from 'src/components/Heading';
import { Button } from '../../components/Button/index';
import { Text } from '../../components/Text/Text';

const TransferPage = () => {
	const [userEmailQueryNumber, setUserEmailQueryNumber] = useState(1);
	const [accountQueryNumber, setAccountQueryNumber] = useState(1);
	const [ownAccountQueryNumber, setOwnAccountQueryNumber] = useState(1);
	const [enteredEmailUserData, setEnteredEmailUserData] = useState('');
	const [enteredIdAccount, setEnteredIdAccount] = useState('');
	const [ownAccount, setOwnAccount] = useState('');
	const [doTransaction, setDoTransaction] = useState(false);
	const [transactionMoney, setTransactionMoney] = useState(0);
	const [transactionEmail, setTransactionEmail] = useState('');
	const [doOwnAccountSearch, setDoOwnAccountSearch] = useState(false);
	const [doEmailSearch, setDoEmailSearch] = useState(false);
	const [doAccountSearch, setDoAccountSearch] = useState(false);
	const [ownUserData, setOwnUserData] = useState({});
	const [accessToken, setAccessToken] = useState('');

	const emailChangeHandler = (event) => {
		setTransactionEmail(event.target.value);
	};
	const moneyChangeHandler = (event) => {
		setTransactionMoney(event.target.value);
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		setOwnUserData(JSON.parse(localStorage.getItem('userData')));
		setAccessToken(`Bearer ${localStorage.getItem('ACCESS_TOKEN')}`);
		setDoOwnAccountSearch(true);
		console.log('Pasando a buscar propia cuenta');
	};

	useEffect(() => {
		async function ownAccountSearch() {
			let url = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts?page=${ownAccountQueryNumber}`;
			const res = await fetch(url, {
				headers: {
					Accept: 'application/json',
					Authorization: accessToken,
				},
			});
			let apiRes = await res.json();

			let result = apiRes.data.find((user) => user.userId == ownUserData.id);
			if (result == undefined && apiRes.data.length != 0) {
				console.log(ownAccountQueryNumber);
				setOwnAccountQueryNumber(ownAccountQueryNumber + 1);
			} else {
				result == undefined
					? (console.log('No encontramos una cuenta asociada a tu usuario'),
					  setDoOwnAccountSearch(false),
					  setOwnAccountQueryNumber(1))
					: (setOwnAccount(result),
					  console.log('Pasando a buscar mail asociado'),
					  setDoOwnAccountSearch(false),
					  setDoEmailSearch(true),
					  setOwnAccountQueryNumber(1));
			}
		}
		doOwnAccountSearch && ownAccountSearch();
	}, [doOwnAccountSearch, ownAccountQueryNumber]);

	useEffect(() => {
		async function emailSearch() {
			let url = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/users?page=${userEmailQueryNumber}`;
			const res = await fetch(url, {
				headers: {
					Accept: 'application/json',
					Authorization: accessToken,
				},
			});
			let apiRes = await res.json();

			let result = apiRes.data.find((user) => user.email == transactionEmail);
			if (result == undefined && apiRes.data.length != 0) {
				console.log(userEmailQueryNumber);
				setUserEmailQueryNumber(userEmailQueryNumber + 1);
			} else {
				result == undefined
					? (console.log('No encontramos a un usuario con tal ID'), setDoEmailSearch(false), setUserEmailQueryNumber(1))
					: (setEnteredEmailUserData(result),
					  console.log('Pasando a buscar cuenta al mail asociado'),
					  setDoAccountSearch(true),
					  setDoEmailSearch(false),
					  setUserEmailQueryNumber(1));
			}
		}
		doEmailSearch && emailSearch();
	}, [doEmailSearch, userEmailQueryNumber]);

	useEffect(() => {
		async function accountSearch() {
			let url = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts?page=${accountQueryNumber}`;
			const res = await fetch(url, {
				headers: {
					Accept: 'application/json',
					Authorization: accessToken,
				},
			});
			let apiRes = await res.json();

			let result = apiRes.data.find((user) => user.userId == enteredEmailUserData.id);
			if (result == undefined && apiRes.data.length != 0) {
				console.log(accountQueryNumber);
				setAccountQueryNumber(accountQueryNumber + 1);
			} else {
				result == undefined
					? (console.log('No encontramos una cuenta asociada a este usuario'),
					  setDoAccountSearch(false),
					  setAccountQueryNumber(1))
					: (setEnteredIdAccount(result),
					  console.log('Pasando a realizar el pago'),
					  setDoAccountSearch(false),
					  setAccountQueryNumber(1),
					  setDoTransaction(true));
			}
		}
		doAccountSearch && accountSearch();
	}, [doAccountSearch, accountQueryNumber]);

	useEffect(() => {
		async function transaction() {
			let enteredUserAddedMoney = parseInt(enteredIdAccount.money) + parseInt(transactionMoney);
			let currentDate = new Date().toJSON().slice(0, 10);
			let urlEnteredUser = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${enteredIdAccount.id}`;
			await fetch(urlEnteredUser, {
				method: 'PUT',
				body: JSON.stringify({
					creationDate: currentDate,
					money: enteredUserAddedMoney,
					isBlocked: false,
					userId: enteredIdAccount.userId,
				}),
				headers: {
					Accept: 'application/json',
					Authorization: accessToken,
					'Content-Type': 'application/json',
				},
			});

			let ownUserSubstractedMoney = parseInt(ownAccount.money) - parseInt(transactionMoney);
			let urlOwnUser = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${ownAccount.id}`;
			await fetch(urlOwnUser, {
				method: 'PUT',
				body: JSON.stringify({
					creationDate: currentDate,
					money: ownUserSubstractedMoney,
					isBlocked: false,
					userId: ownAccount.userId,
				}),
				headers: {
					Accept: 'application/json',
					Authorization: accessToken,
					'Content-Type': 'application/json',
				},
			});
			console.log('Pago realizado!');
			setTransactionEmail('');
			setTransactionMoney(0);
			setOwnAccount('');
			setEnteredEmailUserData('');
			setEnteredIdAccount('');
			setDoTransaction(false);
		}
		doTransaction && transaction();
	}, [doTransaction]);

	return (
		<LayoutPage>
			<Heading as="h2" className=" text-ct-primary-600 ">
				{' '}
				Hello
			</Heading>
			<form
				onSubmit={submitHandler}
				className="flex w-full min-w-[250px] max-w-[450px] flex-col items-center gap-8 rounded-md p-8"
			>
				<div className="flex w-full flex-col  gap-4">
					<div className="flex w-full flex-col items-start gap-1">
						<Text as="label" variant="standard">
							Who do you want to send money to?
						</Text>
						<input
							type="text"
							placeholder="johndoe@gmail.com"
							className="w-full rounded-md border border-black py-2 px-4 text-sm"
							value={transactionEmail}
							onChange={emailChangeHandler}
						/>
					</div>
					<div className="flex w-full flex-col items-start gap-1">
						<Text as="label" variant="standard">
							Insert amount
						</Text>
						<input
							type="number"
							placeholder="0"
							value={transactionMoney}
							onChange={moneyChangeHandler}
							className="w-full rounded-md border border-black py-2 px-4 text-sm"
						/>
					</div>
				</div>
				<div className="flex w-full flex-col items-center gap-2">
					<Button type="submit" variant="primary" style="w-full">
						Transfer money
					</Button>
				</div>
			</form>
		</LayoutPage>
	);
};

export default TransferPage;
