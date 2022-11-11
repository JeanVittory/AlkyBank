import React from 'react';
import { Button } from 'src/components/Button';
import { Icon } from 'src/components/Icon/Icon';

/**
 * @typedef {Object} CustomProps
 * @property {JSX.IntrinsicElements["svg"]} [icon]
 * @param {React.ComponentProps<"button"> & CustomProps} props
 */
export function IconButton({ className = '', icon, ...props }) {
	return (
		<Button {...props} className={`!p-2 leading-[0] ${className}`}>
			<Icon as={icon} />
		</Button>
	);
}
