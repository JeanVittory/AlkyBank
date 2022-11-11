import React from 'react';

const textVariant = /** @type {const} */ ({
	lead: 'lead',
	standard: 'standard',
});

export const Text = React.forwardRef(
	/**
	 *Text for the paragraph element and others
	 *@param {Object} props
	 *@param {keyof JSX.IntrinsicElements} [props.as] - Heading tag to display
	 *@param {React.ReactNode} [props.children]
	 *@param {typeof textVariant[keyof typeof textVariant]} [props.variant= "standard"]
	 *@param {string} [props.className]
	 */
	function Text({ as: Tag = 'div', className = '', variant = textVariant.standard, children, ...props }, ref) {
		return (
			<Tag
				{...props}
				ref={ref}
				className={`${className} ${
					variant === textVariant.standard
						? 'text-base leading-[150%] md:text-lg'
						: variant === textVariant.lead
						? 'text-xl leading-[150%] md:text-2xl'
						: ''
				} font-roboto tracking-[0] decoration-[none]`}
			>
				{children}
			</Tag>
		);
	},
);
