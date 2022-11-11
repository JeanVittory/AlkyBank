import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/index';
import { Text } from '../../components/Text/Text';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const AccountTransfer = () => {
	const [ownAccountQueryNumber, setOwnAccountQueryNumber] = useState(1);
	const [enteredIdAccount, setEnteredIdAccount] = useState('');
	const [ownAccount, setOwnAccount] = useState('');
	const [doTransaction, setDoTransaction] = useState(false);
	const [transactionMoney, setTransactionMoney] = useState('');
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

	const user = useSelector((state) => state.auth.user);

	const submitHandler = async (event) => {
		event.preventDefault();
		setOwnUserData(user);
		setAccessToken(`Bearer ${localStorage.getItem('ACCESS_TOKEN')}`);
		transactionMoney > 0
			? transactionAccount != ''
				? (setDoOwnAccountSearch(true),
				  Swal.fire({
						title: 'Loading...',
						text: 'Please, wait until the transaction is done',
						allowEscapeKey: false,
						allowOutsideClick: false,
						didOpen: () => {
							Swal.showLoading();
						},
				  }))
				: Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Please, enter a valid account ID',
						confirmButtonText: 'Understood',
						showCloseButton: true,
						allowOutsideClick: false,
				  })
			: Swal.fire({
					icon: 'error',
					title: 'Error',
					text: 'Please, enter a valid amount',
					confirmButtonText: 'Understood',
					showCloseButton: true,
					allowOutsideClick: false,
			  });
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
				setOwnAccountQueryNumber(ownAccountQueryNumber + 1);
			} else {
				result == undefined
					? (Swal.close(),
					  Swal.fire({
							icon: 'error',
							title: 'Error',
							text: 'We could not find an account linked to your user',
							confirmButtonText: 'Understood',
							showCloseButton: true,
							allowOutsideClick: false,
					  }),
					  setDoOwnAccountSearch(false),
					  setOwnAccountQueryNumber(1))
					: (setOwnAccount(result),
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
				Swal.close(),
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'We could not find an account with the provided ID',
						confirmButtonText: 'Understood',
						showCloseButton: true,
						allowOutsideClick: false,
					});
			} else {
				setEnteredIdAccount(apiRes);
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
			Swal.close();
			Swal.fire({
				icon: 'success',
				title: 'Success',
				html: `Transaction completed.<br><br> You have send $${transactionMoney} to the account #${enteredIdAccount.id}`,
				confirmButtonText: 'Continue',
				showCloseButton: true,
				allowOutsideClick: false,
			});
			setTransactionAccount('');
			setTransactionMoney('');
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
