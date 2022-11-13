import logo from 'src/assets/alkemy_logo.svg';
import { Heading } from 'src/components/Heading';
import aos from 'aos';
import { useEffect } from 'react';

const Footer = () => {
	useEffect(() => {
		aos.init();
	}, []);
	return (
		<div className="w-full bg-ct-primary-700">
			<footer
				data-aos="fade-right"
				className="mx-auto flex w-full max-w-screen-xl items-center justify-around py-4 xl:px-0"
			>
				<section className="hidden md:block">
					<Heading as="h5" size="headline6" className="py-1 text-ct-secondary-100">
						Contacto:
					</Heading>
					<ul className="space-y-1">
						{['324 567 89 90', 'Cl. Manuela Del Valle # 5694', 'Horacio Sur, Perú'].map((v) => (
							<li key={v} className="text-xs font-medium text-ct-secondary-100">
								{v}
							</li>
						))}
					</ul>
				</section>
				<section>
					<img src={logo} alt="logo" />
					<p className="py-1 text-xs font-medium text-ct-secondary-100">
						&copy; {new Date().getFullYear()} All rights reserved
					</p>
				</section>
				<section>
					<ul className="space-y-1">
						{['Términos de Servicio', 'Privacidad', 'PQRS'].map((v) => (
							<li key={v} className="py-1 text-xs font-medium text-ct-secondary-100">
								<button className="hover:underline">{v}</button>
							</li>
						))}
					</ul>
				</section>
			</footer>
		</div>
	);
};
export { Footer };

