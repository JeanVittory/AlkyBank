import React from 'react';

const IconVariant = /**@type {const}*/ ({
	XS: 'xs',
	SMALL: 'sm',
	BASE: 'base',
	LARGE: 'lg',
	EXTRA_LARGE: 'xl',
});

export const Icon = React.forwardRef(
	/**
	 *Text for the paragraph element and others
	 *@param {Object} props
	 *@param {JSX.IntrinsicElements["svg"]} [props.as] - Heading tag to display
	 *@param {React.ReactNode} [props.children]
	 *@param {typeof IconVariant[keyof typeof IconVariant]} [props.variant= "base"]
	 *@param {string} [props.className]
	 */
	function Icon({ className = '', as: Icon, variant = 'base' }, ref) {
		return (
			<i className={`${className} inline-block leading-[0]`} ref={ref}>
				<Icon
					className={`inline-block text-inherit ${
						variant === IconVariant.XS
							? 'text-lg sm:text-xl'
							: variant === IconVariant.SMALL
							? 'text-xl sm:text-2xl'
							: variant === IconVariant.BASE
							? 'text-2xl sm:text-3xl'
							: variant === IconVariant.LARGE
							? 'text-3xl sm:text-4xl'
							: variant === IconVariant.EXTRA_LARGE
							? 'text-5xl sm:text-6xl'
							: '[font-size:inherit]'
					}`}
				/>
			</i>
		);
	},
);
