import { Button } from '../Button';
import { useDispatch } from 'react-redux';
import { authActions } from '../../features/auth/authSlice';
import { clearCredit } from 'src/features/credit/creditSlice';

const ButtonLogout = ({ handlerLogin, variant, close }) => {
	const dispatch = useDispatch();

	const handlerLogout = () => {
		localStorage.clear();
		dispatch(authActions.logout());
		dispatch(clearCredit());
		handlerLogin();
	};
	return (
		<>
			<Button variant={variant} onClick={handlerLogout} data-close={close}>
				Logout
			</Button>
		</>
	);
};

export { ButtonLogout };

