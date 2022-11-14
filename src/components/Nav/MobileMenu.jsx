import close from '../../assets/close.svg';
import { ButtonLogout } from '../ButtonLogout';
import { Link } from 'react-router-dom';

const MobileMenu = ({ setShowMenu, showMenu, handlerLogin }) => {
	let positionPanel = showMenu ? 'right-0' : 'right-[-20rem]';
	let opacityBlackout = showMenu ? 'opacity-1' : 'opacity-0';
	let positionBlackout = showMenu ? 'left-0' : 'right-[-90rem]';

	return (
		<div
			className={`fixed z-10 bg-black-transparent transition-all duration-1000 ease-in-out ${opacityBlackout} ${positionBlackout} top-0 h-full w-full lg:hidden`}
			onClick={() => setShowMenu(false)}
		>
			<ul
				className={`fixed top-0 bg-ct-primary-700 transition-all duration-1000 ease-in-out ${positionPanel} flex h-full w-60 flex-col justify-evenly`}
			>
				<li>
					<img
						src={close}
						alt="close button"
						className="absolute top-4 left-4 w-6 font-medium text-ct-secondary-200"
						onClick={() => setShowMenu(false)}
					/>
				</li>
				<li>
					<Link to="/deposit" className="mx-4 px-2 py-1 font-medium text-ct-secondary-200">
						Deposit
					</Link>
				</li>
				<li>
					<Link to="/payments" className="mx-4 px-2 py-1 font-medium text-ct-secondary-200">
						Payments
					</Link>
				</li>
				<li>
					<Link to="/balance" className="mx-4 px-2 py-1 font-medium text-ct-secondary-200">
						Balance
					</Link>
				</li>
				<li>
					<Link to="/transactions" className="mx-4 px-2 py-1 font-medium text-ct-secondary-200">
						Movements
					</Link>
				</li>
				<li>
					<Link to="/transfer" className="mx-4 px-2 py-1 font-medium text-ct-secondary-200">
						Transfer
					</Link>
				</li>
				<li className="mx-4 px-2">
					<ButtonLogout colorScheme="secondary" handlerLogin={handlerLogin}>
						Logout
					</ButtonLogout>
				</li>
			</ul>
		</div>
	);
};

export { MobileMenu };

