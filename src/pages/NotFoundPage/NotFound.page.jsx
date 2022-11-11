import { Link } from 'react-router-dom';
import { Button } from 'src/components/Button';

export default function NotFoundPage() {
	return (
		<div className="flex w-full flex-col items-center gap-2">
			<img src="https://stories.freepiklabs.com/storage/23103/404-error-rafiki-2773.png" alt="404" />
			<Link to="/" className="mt-10">
				<Button variant="solid">Back to homepage</Button>
			</Link>
		</div>
	);
}
