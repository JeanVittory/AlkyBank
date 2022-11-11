import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/index';
import { Text } from '../../components/Text/Text';

const AccountTransfer = () => {
	const [ownAccountQueryNumber, setOwnAccountQueryNumber] = useState(1);
	const [enteredIdAccount, setEnteredIdAccount] = useState('');
	const [ownAccount, setOwnAccount] = useState('');
	const [doTransaction, setDoTransaction] = useState(false);
	const [transactionMoney, setTransactionMoney] = useState(0);
	const [transactionAccount, setTransactionAccount] = useState('');
	const [doOwnAccountSearch, setDoOwnAccountSearch] = useState(false);
	const [doAccountDataGrab, setDoAccountDataGrab] = useState(false);
	const [ownUserData, setOwnUserData] = useState({});
	const [accessToken, setAccessToken] = useState('');

	const transactionAccountChangeHandler = (event) => {
		setTransactionAccount(event.target.value);
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
					  setDoAccountDataGrab(true),
					  setOwnAccountQueryNumber(1));
			}
		}
		doOwnAccountSearch && ownAccountSearch();
	}, [doOwnAccountSearch, ownAccountQueryNumber]);

	useEffect(() => {
		async function accountDataGrab() {
			let url = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/accounts/${transactionAccount}`;
			const res = await fetch(url, {
				headers: {
					Accept: 'application/json',
					Authorization: accessToken,
				},
			});
			let apiRes = await res.json();

			if (apiRes.status == 500) {
				console.log('No encontramos una cuenta asociada a ese ID');
			} else {
				setEnteredIdAccount(JSON.parse(apiRes)), console.log('Pasando a realizar el pago');
				setDoAccountDataGrab(false);
				setDoTransaction(true);
			}
		}
		doAccountDataGrab && accountDataGrab();
	}, [doAccountDataGrab]);

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
			setTransactionAccount('');
			setTransactionMoney(0);
			setOwnAccount('');
			setEnteredIdAccount('');
			setDoTransaction(false);
		}
		doTransaction && transaction();
	}, [doTransaction]);

	return (
		<form
			onSubmit={submitHandler}
			className="flex w-full min-w-[250px] max-w-[450px] flex-col items-center gap-8 rounded-md p-8"
		>
			<div className="flex w-full flex-col  gap-4">
				<div className="flex w-full flex-col items-start gap-1">
					<Text as="label" variant="standard">
						To which account do you want to send money?
					</Text>
					<input
						type="text"
						placeholder="370"
						className="w-full rounded-md border border-black py-2 px-4 text-sm"
						value={transactionAccount}
						onChange={transactionAccountChangeHandler}
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
				<Button type="submit" variant="solid">
					Transfer money
				</Button>
			</div>
		</form>
	);
};

export default AccountTransfer;
