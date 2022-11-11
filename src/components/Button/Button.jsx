import { themeColorScheme } from 'src/ui/themeColorScheme';

const buttonVariant = /**@type {const} */ ({
	solid: 'solid',
	outline: 'outline',
	ghost: 'ghost',
});

/**
 * @typedef {Object} CustomProps
 * @property {typeof themeColorScheme[keyof themeColorScheme] } [props.colorScheme]
 * @property {typeof buttonVariant[keyof buttonVariant] } [props.variant]
 * @param {React.ComponentProps<"button"> & CustomProps} props
 */
export const Button = ({
	variant = buttonVariant.solid,
	colorScheme = themeColorScheme.primary,
	children,
	className,
	...props
}) => {
	return (
		<button
			{...props}
			className={`${className} ${
				variant === buttonVariant.solid
					? colorScheme === themeColorScheme.primary
						? 'bg-ct-primary-400 text-ct-neutral-light-50'
						: colorScheme === themeColorScheme.secondary
						? 'bg-ct-secondary-400 text-ct-neutral-dark-700'
						: colorScheme === themeColorScheme.tertiary
						? 'bg-ct-tertiary-400 text-ct-neutral-dark-700'
						: colorScheme === themeColorScheme.success
						? 'bg-ct-success-400 text-ct-neutral-dark-700'
						: colorScheme === themeColorScheme.warning
						? 'bg-ct-warning-400 text-ct-neutral-dark-700'
						: colorScheme === themeColorScheme.danger
						? 'bg-ct-danger-400 text-ct-neutral-dark-700'
						: ''
					: variant === buttonVariant.outline
					? colorScheme === themeColorScheme.primary
						? 'border border-ct-primary-100 text-ct-primary-400 hover:bg-ct-primary-400/10'
						: colorScheme === themeColorScheme.secondary
						? 'border border-ct-secondary-100 text-ct-secondary-400 hover:bg-ct-secondary-400/10'
						: colorScheme === themeColorScheme.tertiary
						? 'border border-ct-tertiary-100 text-ct-tertiary-400 hover:bg-ct-tertiary-400/10'
						: colorScheme === themeColorScheme.success
						? 'border border-ct-success-100 text-ct-success-400 hover:bg-ct-success-400/10'
						: colorScheme === themeColorScheme.warning
						? 'border border-ct-warning-100 text-ct-warning-400 hover:bg-ct-warning-400/10'
						: colorScheme === themeColorScheme.danger
						? 'border border-ct-danger-100 text-ct-danger-400 hover:bg-ct-danger-400/10'
						: ''
					: variant === buttonVariant.ghost
					? colorScheme === themeColorScheme.primary
						? 'text-ct-primary-400 hover:bg-ct-primary-400/10'
						: colorScheme === themeColorScheme.secondary
						? 'text-ct-secondary-400 hover:bg-ct-secondary-400/10'
						: colorScheme === themeColorScheme.tertiary
						? 'text-ct-tertiary-400 hover:bg-ct-tertiary-400/10'
						: colorScheme === themeColorScheme.success
						? 'text-ct-success-400 hover:bg-ct-success-400/10'
						: colorScheme === themeColorScheme.warning
						? 'text-ct-warning-400 hover:bg-ct-warning-400/10'
						: colorScheme === themeColorScheme.danger
						? 'text-ct-danger-400 hover:bg-ct-danger-400/10'
						: ''
					: ''
			} grid items-center justify-center rounded-md px-4 py-2 font-poppins text-base font-medium outline-ct-special1-500 transition-all duration-150 hover:brightness-90 disabled:pointer-events-none disabled:opacity-60 md:text-lg`}
		>
			{children}
		</button>
	);
};
