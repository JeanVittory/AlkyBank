import { useDispatch } from 'react-redux';
import { Button } from 'src/components/Button';
import { cleanActions } from 'src/features/clean/cleanSlice';

const ButtonLogout = ({ handlerLogin, colorScheme, close }) => {
	const dispatch = useDispatch();

	const handlerLogout = () => {
		localStorage.clear();
		dispatch(cleanActions.clean());
		handlerLogin();
	};

	return (
		<Button colorScheme={colorScheme} onClick={handlerLogout} data-close={close} className="ml-6">
			Logout
		</Button>
	);
};

export { ButtonLogout };

