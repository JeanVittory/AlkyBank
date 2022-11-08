import { SignInForm } from 'src/components/SignInForm';

  function LayoutPage({children}) {
	return (
		<>	 						
			<div className={`container mx-auto   sm:px-12  flex flex-col gap-5 my-12`}>
				<div className="rounded border border-ct-primary-100 bg-ct-primary-100/10 px-6 py-6" >
					 {children}
				</div>
			</div>
						
		</>
	);
}

export {LayoutPage};