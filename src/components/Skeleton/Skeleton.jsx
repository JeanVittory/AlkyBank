import React from 'react';

export const Skeleton = ({ className = '' }) => {
	return (
		<div className={`animate-pulse bg-gradient-to-r from-ct-neutral-dark-400 to-ct-neutral-medium-400 ${className}`} />
	);
};
