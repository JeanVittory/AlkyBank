import React from 'react';

const TitleSize = /**@type {const} */ ({
	headline1: 'headline1',
	headline2: 'headline2',
	headline3: 'headline3',
	headline4: 'headline4',
	headline5: 'headline5',
	headline6: 'headline6',
});

/**
 *Heading for the titles
 *@param {Object} props
 *@param {"h1" | "h2" | "h3" | "h4" | "h5" | "h6" } [props.as] - Heading tag to display
 *@param {typeof TitleSize[keyof TitleSize] } [props.size] - Heading tag to display
 *@param {React.ReactNode} [props.children]
 *@param {string} [props.className]
 */
export const Heading = ({ as: Tag = 'h1', size = TitleSize.headline1, className = '', children, ...props }) => {
	return (
		<Tag
			{...props}
			className={`${className} ${
				size === TitleSize.headline1
					? 'text-5xl font-black uppercase leading-[80%] md:text-7xl'
					: size === TitleSize.headline2
					? 'text-4xl font-black uppercase leading-[80%] md:text-5xl'
					: size === TitleSize.headline3
					? 'text-3xl font-black uppercase leading-[80%] md:text-4xl'
					: size === TitleSize.headline4
					? 'text-2xl font-black uppercase leading-[80%] md:text-3xl'
					: size === TitleSize.headline5
					? 'text-xl font-black uppercase leading-[80%] md:text-2xl'
					: size === TitleSize.headline6
					? 'text-lg font-black uppercase leading-[80%] md:text-xl'
					: ''
			} font-barlow tracking-wide decoration-[none]`}
		>
			{children}
		</Tag>
	);
};
