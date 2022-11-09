import React from 'react';

/**
 *Heading for the titles
 *@param {Object} props
 *@param {"h1" | "h2" | "h3" | "h4" | "h5" | "h6" } [props.as] - Heading tag to display
 *@param {React.ReactNode} [props.children]
 *@param {string} [props.className]
 */
export const Heading = ({ as: Tag = 'h1', className = '', children, ...props }) => {
	return (
		<Tag
			{...props}
			className={`${className} ${
				Tag === 'h1'
					? 'md:text-[64px] leading-[75px] text-4xl'
					: Tag === 'h2'
					? 'text-4xl leading-[40px]'
					: Tag === 'h3'
					? 'text-2xl leading-[30px]'
					: Tag === 'h4'
					? 'text-lg leading-[20px]'
					: Tag === 'h5'
					? 'text-base leading-[20px]'
					: Tag === 'h6'
					? 'text-base leading-[20px]'
					: ''
			} font-barlow tracking-[0] decoration-[none] font-bold`}
		>
			{children}
		</Tag>
	);
};

