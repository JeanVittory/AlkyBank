export const CardBalance = (props) => {
	const { image, title, amount, link } = props;

	return (
		<div className="flex w-full flex-col items-center justify-center rounded-lg bg-white px-6 pt-6 shadow-md">
			<div className="mb-8">
				<img className="h-40 w-40  object-cover object-center" src={image} alt="logo" />
			</div>
			<div className="w-full text-center">
				<p className="text-base font-normal text-gray-400">{title}</p>
				<p className="mb-2  text-4xl font-bold text-gray-700">$ {amount} </p>
				<p className="pt-4 pb-6 text-right">
					<a href="#" className="font-medium  text-ct-primary-600  hover:text-blue-600">
						Ver Detalle{' '}
					</a>
				</p>
			</div>
		</div>
	);
};
