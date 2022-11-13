import { useSearchParams } from 'react-router-dom';
import { Heading } from 'src/components/Heading';
import { MovementPaymentFormCreateOrEdit } from 'src/components/MovementPaymentFormCreateOrEdit';

export default function PaymentsPage() {
	const [searchParams] = useSearchParams();

	const movementId = searchParams.get('movementId');

	return (
		<main className="mx-auto w-full max-w-screen-xl px-4 py-10 xl:px-0">
			<Heading className="mb-10 text-ct-neutral-dark-700">Payments</Heading>

			<div className="flex items-center gap-4">
				<img alt="payments-image" src="/payments-page.svg" className="hidden max-w-[500px] lg:block" />

				<MovementPaymentFormCreateOrEdit movementId={movementId} />
			</div>
		</main>
	);
}
