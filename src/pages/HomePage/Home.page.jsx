import { Heading } from 'src/components/Heading';
import people from '../../assets/home/people-home.svg';
import { useSelector } from 'react-redux';
import { useCalculateBalance } from 'src/hooks/useCalculateBalance';
import styles from './home.module.css';
import { useState, useEffect } from 'react';
import aos from 'aos';
import 'aos/dist/aos.css';
import { capitalize } from '../../utils/capitalize';
import moment from 'moment';

export default function HomePage() {
	const { movementList } = useSelector((state) => state.movements);
	const [showTXN, setShowTXN] = useState(false);
	const { balance, currencyCode, movementListBasedOnCurrency } = useCalculateBalance(movementList);
	const [isRotate, setIsRotate] = useState(false);

	const lastmovements = movementListBasedOnCurrency.filter((item, idx) => {
		if (idx <= 5) {
			return item;
		}
	});

	useEffect(() => {
		aos.init({
			once: true,
			offset: 20,
		});
	}, []);

	const hanlderShowTXN = () => {
		setShowTXN(!showTXN);
	};

	const revealBalance = () => {
		setIsRotate(!isRotate);
	};

	return (
		<main className="overflow-x-hidden">
			<div className="flex h-auto w-screen flex-col items-center justify-center overflow-x-hidden overflow-y-hidden  lg:mb-20 lg:flex-row">
				<img src={people} data-aos="fade-right" className="mx-auto w-[100%] max-w-xl pt-[4rem] lg:m-0 " alt="people" />
				<section
					data-aos="fade-down"
					className="flex w-screen snap-start flex-col items-center justify-center gap-y-2 px-4 pb-[4rem] pt-10 lg:mt-20 lg:w-[50%] lg:min-w-max lg:px-5"
				>
					<img src={'./alkemy_logo.svg'} className="mx-auto w-auto" alt="logo" />
					<Heading
						as="h3"
						className="mt-1 border-t border-neutral-900 px-4 text-center text-[32px] leading-none md:text-5xl lg:text-4xl"
					>
						Welcome to <span className="text-ct-neutral-dark-500 ">Alkybank</span>
					</Heading>
					<div className="flex items-center justify-center gap-2">
						<div className={`${styles.mainContainer} mt-5 `}>
							<div className={`${styles.card} ${isRotate && `${styles.rotation}`}`}>
								<div className={`${styles.front} font-roboto`}>Current Balance</div>
								<div className={`${styles.back}`}>
									{currencyCode}. {balance}
								</div>
							</div>
						</div>
					</div>
					<button
						onClick={hanlderShowTXN}
						className="h-[30px] w-[180px] rounded-[20px] bg-ct-neutral-medium-200 text-center  font-roboto text-[18px] font-bold text-[#333]"
					>
						Latest TXN
					</button>
					<button
						onClick={revealBalance}
						className="relative bottom-[72px] left-[120px] rounded-lg px-2 text-sm underline"
					>
						{isRotate ? 'Hide' : 'Show'}
					</button>
				</section>
			</div>

			{movementListBasedOnCurrency && showTXN ? (
				<section
					data-aos="fade-down"
					className="mb-8 mt-4 grid h-auto grid-cols-1 grid-rows-3 place-items-center gap-4 px-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-3"
				>
					{lastmovements.map((movement) => {
						return (
							<article
								key={movement.id}
								className={`flex w-1/2 max-w-[220px] flex-col gap-y-2 rounded-lg  bg-[#00000031] p-3 ${styles.boxShadow}`}
							>
								<section className="flex justify-between">
									<div className="font-roboto text-sm font-bold">{capitalize(movement.type)}</div>
									<div className="font-roboto text-sm">
										{movement.currencyCode}. {movement.amount}
									</div>
								</section>
								<section className="flex justify-between">
									<div className="font-roboto text-sm font-bold">Date</div>
									<div className="font-roboto text-sm">{moment(movement.date).format('MMM, M, YYYY')}</div>
								</section>
								<section className="flex justify-between">
									<div className="font-roboto text-sm font-bold">Destiny</div>
									<div className="font-roboto text-sm">{movement.to_account_id}</div>
								</section>
								<div></div>
							</article>
						);
					})}
				</section>
			) : null}
		</main>
	);
}

