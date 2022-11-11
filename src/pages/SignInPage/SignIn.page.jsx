import { SignInForm } from 'src/components/SignInForm';
import { AccounstRepository } from 'src/repositories/accounts.repository';
import { AuthRepository } from 'src/repositories/auth.repository';
import { UsersRepository } from 'src/repositories/users.repository';

export default function SignInPage() {
	return (
		<main className="my-auto">
			<SignInForm
				accounstRepository={AccounstRepository}
				authRepository={AuthRepository}
				usersRepository={UsersRepository}
			/>
		</main>
	);
}
