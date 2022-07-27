import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: []
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsersAction: (state, action) => {
        state.users = action.payload
      }
    }
});

export const { setUsersAction } = usersSlice.actions

export const setUsers = (users) => {
  return async dispatch => { 
    dispatch(setUsersAction(users))
  } 
}

export default usersSlice.reducer;;

