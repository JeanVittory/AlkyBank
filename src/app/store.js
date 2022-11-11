import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'src/features/auth/authSlice';
import creditReducer from 'src/features/credit/creditSlice';
import movementsReducer from 'src/features/movements/movementsSlice';
import uiReducer from 'src/features/ui/uiSlice';
import userReducer from 'src/features/users/userSlice';

export default configureStore({
	reducer: {
		credits: creditReducer,
		user: userReducer,
		auth: authReducer,
		ui: uiReducer,
		movements: movementsReducer,
	},
});
