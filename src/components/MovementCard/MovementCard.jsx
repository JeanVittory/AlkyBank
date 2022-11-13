import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { Text } from 'src/components/Text';
import { MovementType } from 'src/models/movementType.model';
import { webRoutes } from 'src/utils/web.routes';

TimeAgo.setDefaultLocale(en.locale);
TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');

export const MovementCard = (props) => {
	const { id, to_account_id, date, currencyCode, showConcept, type, isTransference, conceptDecoded, amount } = props;

	const navigate = useNavigate();
	const [toggle, setToggle] = React.useState(true);

	const linkToEdit =
		MovementType.topup === type
			? `${webRoutes.deposit}?movementId=${id}`
			: MovementType.payment && !isTransference
			? `${webRoutes.payments}?movementId=${id}`
			: null;

	React.useEffect(() => {
		setToggle(showConcept);
	}, [showConcept]);

	return (
		<article
			className={`${
				type === MovementType.topup
					? 'border-ct-success-500 bg-ct-success-50/30'
					: type === MovementType.payment && !isTransference
					? 'border-ct-danger-100 bg-ct-danger-50/30'
					: 'border-ct-danger-100 bg-ct-danger-50/30'
			} h-full w-full items-center gap-2 overflow-hidden rounded border p-4 shadow-md outline-ct-special1-500 backdrop-blur-md transition-all duration-200`}
		>
			<header className="flex justify-between">
				<Heading as="h2" size="headline6" className="font-semibold tracking-wide">
					Transaction: {id}
				</Heading>

				<Text
					as="small"
					className="!text-sm text-gray-500"
					title={`${new Date(date).toLocaleDateString()} ${new Date(date).toLocaleTimeString()}`}
				>
					{timeAgo.format(new Date(date))}
				</Text>
			</header>

			<div className="grid grid-cols-[1fr_auto] text-left text-ct-neutral-light-800">
				<div>
					{type === MovementType.topup ? (
						<Text as="p" className="text-ct-success-600">
							Charge
						</Text>
					) : type === MovementType.payment && !isTransference ? (
						<Text as="p" className="text-ct-danger-600">
							Payment
						</Text>
					) : (
						<Text as="p" className="text-ct-neutral-light-300">
							Transference
						</Text>
					)}

					<Text className={`${isTransference ? 'visible' : 'invisible'}`}>To account: {to_account_id}</Text>

					<Button
						onClick={() => navigate(linkToEdit)}
						variant="ghost"
						colorScheme="success"
						size="xs"
						className={`${linkToEdit ? 'visible' : 'invisible'} !text-sm font-bold mix-blend-multiply`}
					>
						Edit
					</Button>
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

			<div className={`${toggle ? 'visible h-auto' : 'h-0 scale-y-0 opacity-0'} transition-all duration-200`}>
				<hr className="my-2" />
				<Text as="p" className="text-left">
					{conceptDecoded.slice(0, 150)}
				</Text>
			</div>
		</article>
	);
};
