import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import { GiPayMoney, GiReceiveMoney } from 'react-icons/gi';
import { IoIosSend } from 'react-icons/io';
import { Heading } from 'src/components/Heading';
import { Text } from 'src/components/Text';
import { MovementType } from 'src/models/movementType.model';
import { Transaction } from 'src/models/transaction.model';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US');

/**
 * @param { typeof Transaction[keyof Transaction]} props
 */

export const MovementCard = (props) => {
	const { id, accountId, userId, to_account_id, date, currencyCode, type, isTransference, conceptDecoded, amount } =
		props;

	const [toggle, setToggle] = React.useState(false);

	return (
		<button
			onClick={() => setToggle((s) => !s)}
			className={`${
				type === MovementType.topup
					? 'border-ct-success-500 bg-ct-success-50/30'
					: type === MovementType.payment && !isTransference
					? 'border-ct-danger-100 bg-ct-danger-50/30'
					: 'border-ct-danger-100 bg-ct-danger-50/30'
			} relative w-full items-center gap-2 overflow-hidden rounded border p-4 shadow-md backdrop-blur-md`}
		>
			<Text
				as="p"
				className={`${
					toggle ? 'visible' : 'opacity-0'
				} absolute inset-0 bg-white p-2 text-left leading-5 backdrop-blur-xl transition-all duration-150`}
			>
				{conceptDecoded.slice(0, 150)}
			</Text>

			{/* <i className="overflow-hidden rounded-full text-5xl">
				{type === MovementType.topup ? (
					<GiReceiveMoney className="text-ct-secondary-500" />
				) : type === MovementType.payment ? (
					<GiPayMoney className="text-ct-danger-200" />
				) : (
					isTransference && <IoIosSend className="text-ct-neutral-dark-800" />
				)}
			</i> */}

			<header className="flex justify-between">
				<Heading as="h2" size="headline6" className="font-semibold !leading-5 tracking-wide">
					Transaction: {id}
				</Heading>

				<Text
					as="small"
					className="text-sm"
					title={`${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}
				>
					{timeAgo.format(new Date(date))}
				</Text>
			</header>

			<div className="grid grid-cols-[1fr_auto] text-left text-ct-neutral-light-800">
				<div>
					<Text as="p">
						{type === MovementType.topup
							? 'Charge'
							: type === MovementType.payment && !isTransference
							? 'Payment'
							: 'Tranference'}{' '}
					</Text>

					<Text className={`${isTransference ? 'visible' : 'invisible'}`}>To account: {to_account_id}</Text>
				</div>
				<Text
					as="p"
					className={`${
						type === MovementType.topup
							? 'text-ct-success-500'
							: type === MovementType.payment
							? 'text-ct-danger-400'
							: ''
					} place-self-end text-right font-medium tracking-wider`}
				>
					{isTransference || type === MovementType.payment ? '-' : '+'} {currencyCode} {amount}
				</Text>
			</div>
		</button>
	);
};
