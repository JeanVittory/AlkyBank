import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isInfoLoaded: false,
	movementList: [],
	currencyList: [],
};

export const movementsSlice = createSlice({
	name: 'movements',
	initialState,
	reducers: {
		loadMovements: (state, action) => {
			state.movementList = action.payload;
		},
		loadCurrencies: (state, action) => {
			state.currencyList = action.payload;
		},
		setInfoIsLoaded: (state) => {
			state.isInfoLoaded = true;
		},
	},
});

export const movementsActions = movementsSlice.actions;

export default movementsSlice.reducer;

