export function LayoutPage({ children }) {
	return (
		<main className="px-4">
			<div className={`container mx-auto   my-12  flex flex-col gap-5 sm:px-12`}>
				<div className="rounded border border-ct-secondary-100 bg-ct-secondary-100/10 px-6 py-6">{children}</div>
			</div>
		</main>
	);
}
