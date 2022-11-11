import React from 'react';
import { Text } from 'src/components/Text';
import { themeColorScheme } from 'src/ui/themeColorScheme';

/**
 * @typedef {Object} CustomProps
 * @property {string} [label]
 * @property {"primary" | "secondary" | "tertiary" } [props.colorScheme]
 * @param {React.ComponentProps<"input"> & CustomProps} props
 */
export function Select({ className, colorScheme = themeColorScheme.primary, children, label, ...props }) {
	const id = React.useId();

	return (
		<div className={`grid`}>
			{label && (
				<Text as="label" htmlFor={id} className="font-semibold text-ct-neutral-medium-700">
					{label}
				</Text>
			)}

			<select
				{...props}
				id={id}
				className={`${className} ${
					colorScheme === themeColorScheme.primary
						? 'border-ct-primary-500'
						: colorScheme === themeColorScheme.secondary
						? 'border-ct-secondary-500'
						: colorScheme === themeColorScheme.tertiary
						? 'border-ct-tertiary-500'
						: ''
				} rounded border border-ct-primary-500 px-2 py-1 font-medium text-ct-neutral-medium-700  outline-ct-special1-500`}
			>
				{children}
			</select>
		</div>
	);
}
