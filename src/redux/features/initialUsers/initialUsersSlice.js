import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	lkUser: [],
	loading: false,
	auth: false,
	authCustomer: false,
}

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.users = action.payload
		},
		logInAdmin: (state, action) => {
			state.auth = true
			state.lkUser = action.payload
		},
		logInCustomer: (state, action) => {
			state.authCustomer = true
			state.lkUser = action.payload
		},
		logOut: (state, action) => {
			state.auth = false
			state.authCustomer = false
			state.lkUser = []
		},
	},
	extraReducers: {},
})

export const { setUser, logInAdmin, logInCustomer, logOut } = usersSlice.actions
export default usersSlice.reducer
