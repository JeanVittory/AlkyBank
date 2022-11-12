import { Heading } from 'src/components/Heading';
import { useSelector } from 'react-redux';
import { useCalculateBalance } from 'src/hooks/useCalculateBalance';
import styles from './home.module.css';
import { useState } from 'react';

export default function HomePage() {
	const { movementList } = useSelector((state) => state.movements);
	const { balance, paymentSum, topupSum, currencyCode, onChangeCurrency, movementListBasedOnCurrency } =
		useCalculateBalance(movementList);

	console.log(movementListBasedOnCurrency);

	const [isRotate, setIsRotate] = useState(false);
	const revealBalance = () => {
		setIsRotate(!isRotate);
	};

	return (
		<div className="flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden bg-white lg:flex-row">
			<img src="/home-page.svg" className="mx-auto w-[100%] max-w-xl pt-[10rem] lg:m-0 lg:p-0" alt="people" />
			<section className="flex w-screen snap-start flex-col items-center justify-center pb-[4rem] pt-10 lg:w-[50%] lg:p-0 gap-4">
				<img src="/alkemy_logo.svg" className="mx-auto min-w-[250px] w-[500px]" alt="logo" />
				<Heading as="h3" className="border-t border-neutral-900 p-4 text-center leading-none md:text-5xl">
					Welcome to <span className="text-ct-neutral-dark-500 ">Alkybank</span>
				</Heading>
				<div className="flex items-center justify-center gap-2">
					<div className={`${styles.mainContainer} mt-3 `}>
						<div className={`${styles.card} ${isRotate && `${styles.rotation}`}`}>
							<div className={`${styles.front}`}>Current balance</div>
							<div className={`${styles.back}`}>
								{currencyCode}. {balance}
							</div>
						</div>
					</div>
					<button onClick={revealBalance} className="mt-3  rounded-lg px-2 text-sm underline">
						{isRotate ? 'Hide' : 'Show'}
					</button>
				</div>
			</section>
		</div>
	);
}

