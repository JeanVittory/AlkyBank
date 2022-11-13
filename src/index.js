import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'animate.css/animate.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { Router } from './Router';
/*React Redux config*/
import reduxStore from './app/store';

const root = ReactDOM.createRoot(/** @type {HTMLElement} */ (document.getElementById('root')));

export const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={reduxStore}>
				<Router />
			</Provider>
		</QueryClientProvider>
		<ToastContainer position="bottom-right" />
	</React.StrictMode>,
);
