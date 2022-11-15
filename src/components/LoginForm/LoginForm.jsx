import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthRepository } from 'src/repositories/auth.repository';
import { webRoutes } from 'src/utils/web.routes';
import { Button } from '../Button';
import { Heading } from '../Heading';
import { Text } from '../Text';

export const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [invalidUser, setInvalidUser] = useState(false);

	const navigateTo = useNavigate();

	const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/gi;

	const handleForm = async (event) => {
		event.preventDefault();

		try {
			const { login, userInfo } = AuthRepository();
			await login({ email, password });
			const user = await userInfo();
			navigateTo(webRoutes.home);
			toast.success(`Welcome back ${user.first_name_decoded} ${user.last_name}`);
		} catch (error) {
			toast.error(error);
			setInvalidUser(true);
		}
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
		<div className="mx-auto max-w-md p-10">
			<form
				onSubmit={handleForm}
				className="flex w-full min-w-[250px] max-w-[450px] flex-col items-center gap-8 rounded-md border border-ct-neutral-dark-800/20 bg-white p-8"
			>
				<Heading className="m-auto text-ct-neutral-dark-800">Log in</Heading>

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
								value={password}
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
						colorScheme="primary"
						className="w-full"
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
						<Button type="button" colorScheme="tertiary" className="w-full">
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
