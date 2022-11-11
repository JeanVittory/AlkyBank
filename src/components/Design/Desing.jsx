import { Route } from 'react-router-dom';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';

export const Desing = () => {
	return (
		<Route
			path="/design"
			element={
				<div className="my-32 grid grid-cols-[repeat(7,auto)] gap-5">
					<div>
						<span>Primary</span>
						<div className="h-10 w-10 rounded-full bg-ct-primary-400" />
					</div>

					<div>
						<span>Secondary</span>
						<div className="h-10 w-10 rounded-full bg-ct-secondary-400" />
					</div>

					<div>
						<span>Tertiary</span>
						<div className="h-10 w-10 rounded-full bg-ct-tertiary-400" />
					</div>

					<div>
						<span>¿?</span>
						<div className="h-10 w-10 rounded-full bg-ct-yelis1-400" />
					</div>

					<div>
						<span>Neutral ligth</span>
						<div className="h-10 w-10 rounded-full bg-ct-neutral-light-400" />
					</div>
					<div>
						<span>Neutral medium</span>
						<div className="h-10 w-10 rounded-full bg-ct-neutral-medium-400" />
					</div>
					<div>
						<span>Neutral dark</span>
						<div className="h-10 w-10 rounded-full bg-ct-neutral-dark-400" />
					</div>

					<div>
						<span>Special1</span>
						<div className="h-10 w-10 rounded-full bg-ct-special1-400" />
					</div>

					<div>
						<span>Special2</span>
						<div className="h-10 w-10 rounded-full bg-ct-special2-400" />
					</div>

					<div>
						<span>Special 3</span>
						<div className="h-10 w-10 rounded-full bg-ct-special3-400" />
					</div>

					<div>
						<span>Success</span>
						<div className="h-10 w-10 rounded-full bg-ct-success-400" />
					</div>
					<div>
						<span>Warning</span>
						<div className="h-10 w-10 rounded-full bg-ct-warning-400" />
					</div>
					<div>
						<span>Error</span>
						<div className="h-10 w-10 rounded-full bg-ct-danger-400" />
					</div>

					<Heading className="m-auto text-ct-primary-600" size="headline1">
						Tu Balance
					</Heading>
					<Heading className="m-auto text-ct-primary-600" size="headline2">
						Tu Balance
					</Heading>
					<Heading className="m-auto text-ct-primary-600" size="headline3">
						Tu Balance
					</Heading>
					<Heading className="m-auto text-ct-primary-600" size="headline4">
						Tu Balance
					</Heading>
					<Heading className="m-auto text-ct-primary-600" size="headline5">
						Tu Balance
					</Heading>
					<Heading className="m-auto text-ct-primary-600" size="headline6">
						Tu Balance
					</Heading>

					<div>
						<Button variant="solid">Prima</Button>
						<Button variant="ghost">Prima</Button>
						<Button variant="outline">Prima</Button>

						<Button variant="solid" colorScheme="secondary">
							Prima
						</Button>
						<Button variant="ghost" colorScheme="secondary">
							Prima
						</Button>
						<Button variant="outline" colorScheme="secondary">
							Prima
						</Button>

						<Button variant="solid" colorScheme="tertiary">
							Prima
						</Button>
						<Button variant="ghost" colorScheme="tertiary">
							Prima
						</Button>
						<Button variant="outline" colorScheme="tertiary">
							Prima
						</Button>
					</div>
				</div>
			}
		/>
	);
};
