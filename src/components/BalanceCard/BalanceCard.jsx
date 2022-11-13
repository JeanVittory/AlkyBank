import { Link } from 'react-router-dom';
import { Heading } from 'src/components/Heading';
import { Text } from 'src/components/Text';
import aos from 'aos';
import { useEffect } from 'react';

export const BalanceCard = (props) => {
	const { image, title, amount, link, currency, className = '' } = props;

	useEffect(() => {
		aos.init();
	}, []);

	return (
		<div
			data-aos="fade-up"
			className={`${className} flex w-full flex-col items-center justify-center rounded-lg border border-ct-neutral-light-50 bg-white/50 p-6 shadow-md`}
		>
			<div className="mb-8">
				<img className="h-40 w-40  object-cover object-center" src={image} alt="logo" />
			</div>

			<div className="w-full text-center">
				<Heading size="headline5" className="mb-2 text-ct-neutral-light-600">
					{title}
				</Heading>

				<Text className="mb-2 !text-xl font-bold text-ct-neutral-light-700 md:!text-2xl">
					<small className="font-normal text-gray-500">{currency}</small> {amount}
				</Text>

				<p className={`${link ? 'visible' : 'invisible'} pt-4 text-right`}>
					<Link to={link} className="font-medium  text-ct-primary-600  hover:text-blue-600">
						Details
					</Link>
				</p>
			</div>
		</div>
	);
};

