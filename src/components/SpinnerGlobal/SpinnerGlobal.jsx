import React from 'react';
import { useSelector } from 'react-redux';
import { Spinner } from 'src/components/Spinner/Spinner';

export const SpinnerGlobal = () => {
	const isSpinnerActive = useSelector((state) => state.ui.isSpinnerActive);

	return <Spinner className={`${isSpinnerActive ? 'visible' : 'invisible -z-50'} fixed inset-0`} />;
};
