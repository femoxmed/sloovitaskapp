import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  company_id: null,
  user: null,
}

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setMainAction: (state, action) => {
        const { token, company_id, user } = action.payload;
        state.token = token;
        state.company_id = company_id;
        state.user = user;
      }
    }
});

export const { setMainAction } = mainSlice.actions;


export default mainSlice.reducer;;

