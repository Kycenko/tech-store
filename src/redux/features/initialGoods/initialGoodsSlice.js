import {createSlice} from '@reduxjs/toolkit';

const initialState = {
	limit: 8,
	category: '',
	searchName: '',
	
};

export const initialGoodsSlice = createSlice({
	name: 'goods',
	initialState,
	reducers: {
		addGoods: (state) => {
			state.limit += 8;
		},
		changeCategory: (state, action) => {
			state.category = action.payload;
		},
		searchName: (state, action) => {
			state.searchName = action.payload;
		},
		
	},
});

export const {addGoods, changeCategory, searchName,} = initialGoodsSlice.actions;
export default initialGoodsSlice.reducer;
