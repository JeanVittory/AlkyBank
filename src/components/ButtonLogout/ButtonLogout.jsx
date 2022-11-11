import { useDispatch } from 'react-redux';
import { Button } from 'src/components/Button';
import { authActions } from 'src/features/auth/authSlice';
import { clearCredit } from 'src/features/credit/creditSlice';

const ButtonLogout = ({ handlerLogin, colorScheme, close }) => {
	const dispatch = useDispatch();

	const handlerLogout = () => {
		localStorage.clear();
		dispatch(authActions.logout());
		dispatch(clearCredit());
		handlerLogin();
	};
	return (
		<Button colorScheme={colorScheme} onClick={handlerLogout} data-close={close}>
			Logout
		</Button>
	);
};

export { ButtonLogout };
