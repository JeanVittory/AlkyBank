import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from 'src/hooks/useAuthentication';
import { AuthRepository } from 'src/repositories/auth.repository';
import { webRoutes } from 'src/utils/web.routes';

export const PublicRoute = ({ children }) => {
	const navigate = useNavigate();

	const { isAuthenticated, isAuthenticating } = useAuthentication(AuthRepository);

	React.useEffect(() => {
		if (isAuthenticated && !isAuthenticating) navigate(webRoutes.home, { replace: true });
	}, [isAuthenticated, isAuthenticating]);

	if (isAuthenticated || isAuthenticating) {
		return <div />;
	}

	return <>{children}</>;
};

