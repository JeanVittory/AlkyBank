import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { webRoutes } from 'src/utils/web.routes';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Text } from '../Text';
import { AuthRepository } from 'src/repositories/auth.repository';
import { useDispatch } from 'react-redux';
import { authActions } from 'src/features/auth/authSlice';
import {toast} from "react-toastify"

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [invalidUser, setInvalidUser] = useState(false);
	const dispatch = useDispatch();
	const navigateTo = useNavigate();


	const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

	const handleForm = async (event) => {
		event.preventDefault();

		const handleForm = async (event) => {
			event.preventDefault();
	
			try {
				const { login, userInfo } = AuthRepository();
				await login({ email, password });
				const responseUserData = await userInfo();
				const userData = { ...responseUserData };
				dispatch(authActions.login(userData));
				navigateTo(webRoutes.home);
				toast.success(`Welcome back ${userData.first_name} ${userData.last_name}`);
			} catch (error) {
				setInvalidUser(true);
			}
		};
	};

	const handleEmail = (event) => {
		setEmail(event.target.value);
	};

	const handlePassword = (event) => {
		setPassword(event.target.value);
	};

	const handleShowPassword = () => {
		setShowPassword((previous) => !previous);
	};

	return (
		<div className="flex min-h-screen items-center justify-center">
			<form
				onSubmit={handleForm}
				className="flex w-full min-w-[250px] max-w-[450px] flex-col items-center gap-8 rounded-md bg-white p-8"
			>
				<Heading as="h2">Log In</Heading>
				<div className="flex w-full flex-col  gap-4">
					<div className="flex w-full flex-col items-start gap-1">
						<Text as="label" variant="standard">
							Email
						</Text>
						<input
							type="text"
							placeholder="johndoe@gmail.com"
							onChange={handleEmail}
							className="w-full rounded-md border border-black py-2 px-4 text-sm"
						/>
						{email?.length ? (
							email?.match(emailRegex) ? (
								''
							) : (
								<Text as="span" className="text-sm text-red-500">
									Please enter a valid email.
								</Text>
							)
						) : (
							''
						)}
					</div>
					<div className="flex w-full flex-col items-start gap-1">
						<Text as="label" variant="standard">
							Password
						</Text>
						<div className="relative w-full">
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="••••••••••••"
								onChange={handlePassword}
								className="w-full rounded-md border border-black py-2 px-4 pr-16 text-sm"
							/>
							<button type="button" onClick={handleShowPassword} className="absolute right-0 h-full px-4 text-xs">
								Show
							</button>
						</div>
					</div>
				</div>
				<div className="flex w-full flex-col items-center gap-2">
					<Button
						type="submit"
						variant="primary"
						style="w-full"
						disabled={email?.length && password?.length ? false : true}
					>
						Log In
					</Button>
					<div className="flex w-full items-center justify-center gap-2">
						<div className="h-[1px] flex-1 bg-gray-200"></div>
						<span className="text-gray-300">or</span>
						<div className="h-[1px] flex-1 bg-gray-200"></div>
					</div>
					<Link to="/signin" style={{ width: '100%' }}>
						<Button type="button" variant="tertiary" style="w-full">
							Sign Up
						</Button>
					</Link>
					{invalidUser ? (
						<Text as="span" className="text-sm text-red-500">
							Invalid email or password.
						</Text>
					) : (
						''
					)}
					<Text as="a" className="text-[12px] text-ct-primary-300">
						Forgot my password
					</Text>
				</div>
			</form>
		</div>
	);
};
