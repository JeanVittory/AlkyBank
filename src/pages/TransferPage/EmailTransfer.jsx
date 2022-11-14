import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/index';
import { Text } from '../../components/Text/Text';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const EmailTransfer = () => {
	const [userEmailQueryNumber, setUserEmailQueryNumber] = useState(1);
	const [accountQueryNumber, setAccountQueryNumber] = useState(1);
	const [ownAccountQueryNumber, setOwnAccountQueryNumber] = useState(1);
	const [enteredEmailUserData, setEnteredEmailUserData] = useState('');
	const [enteredIdAccount, setEnteredIdAccount] = useState('');
	const [ownAccount, setOwnAccount] = useState('');
	const [doTransaction, setDoTransaction] = useState(false);
	const [transactionMoney, setTransactionMoney] = useState('');
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

	const user = useSelector((state) => state.auth.user);

	const submitHandler = async (event) => {
		event.preventDefault();
		setOwnUserData(user);
		setAccessToken(`Bearer ${localStorage.getItem('ACCESS_TOKEN')}`);
		transactionMoney > 0
			? transactionEmail != ''
				? (setDoOwnAccountSearch(true),
				  Swal.fire({
						title: 'Loading...',
						html: 'Please, wait until the transaction is done<br>',
						allowEscapeKey: false,
						allowOutsideClick: false,
						didOpen: () => {
							Swal.showLoading();
						},
				  }))
				: Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Please, enter a valid email adress',
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

			Swal.update({
				html: `Please, wait until the transaction is done<br>Checking your account in our database for validation...<br> (Page: ${ownAccountQueryNumber})`,
				showConfirmButton: false,
			});

			if (apiRes.status == 403) {
				return (
					Swal.close(),
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Only users with admin role can perform transactions',
						confirmButtonText: 'Understood',
						showCloseButton: true,
						allowOutsideClick: false,
					}),
					setDoOwnAccountSearch(false),
					setOwnAccountQueryNumber(1),
					setTransactionEmail(''),
					setTransactionMoney('')
				);
			}

			let result = apiRes.data.find((user) => user.userId == ownUserData.id);
			if (result == undefined && apiRes.data.length != 0) {
				setOwnAccountQueryNumber(ownAccountQueryNumber + 1);
			} else {
				result == undefined
					? (Swal.close(),
					  Swal.fire({
							icon: 'error',
							title: 'Error',
							text: 'We could not find an account linked to your user. Please, perform a deposit to proceed',
							confirmButtonText: 'Understood',
							showCloseButton: true,
							allowOutsideClick: false,
					  }),
					  setDoOwnAccountSearch(false),
					  setOwnAccountQueryNumber(1),
					  setTransactionEmail(''),
					  setTransactionMoney(''))
					: (setOwnAccount(result), setDoOwnAccountSearch(false), setDoEmailSearch(true), setOwnAccountQueryNumber(1));
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

			Swal.update({
				html: `Please, wait until the transaction is done<br> Checking your account in our database for validation ✅<br>
				Checking if the entered email is linked to an user...<br> (Page ${userEmailQueryNumber})`,
				showConfirmButton: false,
			});

			let result = apiRes.data.find((user) => user.email == transactionEmail);
			if (result == undefined && apiRes.data.length != 0) {
				setUserEmailQueryNumber(userEmailQueryNumber + 1);
			} else {
				result == undefined
					? (Swal.close(),
					  Swal.fire({
							icon: 'error',
							title: 'Error',
							text: 'We could not find an user linked to the provided Email',
							confirmButtonText: 'Understood',
							showCloseButton: true,
							allowOutsideClick: false,
					  }),
					  setDoEmailSearch(false),
					  setUserEmailQueryNumber(1),
					  setTransactionEmail(''),
					  setTransactionMoney(''))
					: (setEnteredEmailUserData(result),
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

			Swal.update({
				html: `Please, wait until the transaction is done<br> Checking your account in our database for validation ✅<br>
				Checking if the entered email is linked to an user ✅ <br>
				Checking if the user has a valid account...<br> (Page ${accountQueryNumber})`,
				showConfirmButton: false,
			});

			let result = apiRes.data.find((user) => user.userId == enteredEmailUserData.id);
			if (result == undefined && apiRes.data.length != 0) {
				setAccountQueryNumber(accountQueryNumber + 1);
			} else {
				result == undefined
					? (Swal.close(),
					  Swal.fire({
							icon: 'error',
							title: 'Error',
							text: 'We could not find an account linked to the provided user',
							confirmButtonText: 'Understood',
							showCloseButton: true,
							allowOutsideClick: false,
					  }),
					  setDoAccountSearch(false),
					  setAccountQueryNumber(1))
					: (setEnteredIdAccount(result), setDoAccountSearch(false), setAccountQueryNumber(1), setDoTransaction(true));
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

			let urlTransaction = `http://wallet-main.eba-ccwdurgr.us-east-1.elasticbeanstalk.com/transactions`;
			await fetch(urlTransaction, {
				method: 'POST',
				body: JSON.stringify({
					amount: transactionMoney,
					concept: '{"concept":"Transfer","currencyCode":"ARS","isTransference":false}',
					date: currentDate,
					type: 'payment',
					accountId: ownAccount.id,
					userId: ownAccount.userId,
					to_account_id: enteredIdAccount.userId,
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
				html: `Transaction completed<br><br> You have sent $${transactionMoney} to the account #${enteredIdAccount.id} from the user #${enteredIdAccount.userId}`,
				confirmButtonText: 'Continue',
				showCloseButton: true,
				allowOutsideClick: false,
			});
			setTransactionEmail('');
			setTransactionMoney('');
			setOwnAccount('');
			setEnteredEmailUserData('');
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
						To which user do you want to send money?
					</Text>
					<input
						type="email"
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
				<Button type="submit" variant="solid">
					Transfer money
				</Button>
			</div>
		</form>
	);
};

export default EmailTransfer;
