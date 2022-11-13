import React from 'react';

export const Spinner = ({ className }) => {
	return (
		<div className={`${className} flex items-center justify-center bg-ct-neutral-dark-400/20`}>
			<img
				src="/spinner.png"
				alt="spinner"
				width="150"
				className="animate__animated animate__bounce animate__infinite"
			/>
		</div>
	);
};
