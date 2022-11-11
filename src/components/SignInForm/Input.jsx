import React from 'react';
import { Text } from 'src/components/Text';
import { themeColorScheme } from 'src/ui/themeColorScheme';

export const Input = React.forwardRef(
	/**
	 * @typedef {Object} CustomProps
	 * @property {string} [label]
	 * @property {"top" | "left"} [labelPosition]
	 * @property {"primary" | "secondary" | "tertiary" } [props.colorScheme]
	 * @param {React.ComponentProps<"input"> & CustomProps} props
	 */
	function Input(
		{
			label,
			className = '',
			colorScheme = themeColorScheme.primary,
			error,
			onError,
			onChange,
			onTouch,
			pattern,
			labelPosition,
			id,
			...props
		},
		ref,
	) {
		const reactId = React.useId();
		const _id = id || reactId;

		const [touched, setTouched] = React.useState(false);

		const _onChange = (e) => {
			const { value = '', name = '' } = e.target;
			const _touched = value.length > 0 || touched;

			if (_touched) setTouched(true);

			onChange(e);
			onTouch?.(name, _touched);

			const isValid = pattern?.test?.(value);
			if (pattern) onError?.(name, !isValid);
		};

		return (
			<div className={`${labelPosition === 'left' ? 'grid grid-cols-[auto_1fr] gap-2' : 'grid'}`}>
				{label && (
					<Text as="label" htmlFor={_id} className="font-semibold text-ct-neutral-medium-700">
						{label}
					</Text>
				)}

				<input
					{...props}
					ref={ref}
					onChange={_onChange}
					id={_id}
					className={`${className} ${
						error
							? 'border-ct-danger-500'
							: colorScheme === themeColorScheme.primary
							? 'border-ct-primary-500'
							: colorScheme === themeColorScheme.secondary
							? 'border-ct-secondary-500'
							: colorScheme === themeColorScheme.tertiary
							? 'border-ct-tertiary-500'
							: ''
					} rounded border px-2 py-1 outline-ct-special1-500`}
				/>
			</div>
		);
	},
);
