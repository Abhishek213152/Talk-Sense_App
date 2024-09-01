import {createSlice} from '@reduxjs/toolkit';

export const emailSlice = createSlice({
  name: 'email',
  initialState: {
    email: null,
  },
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearEmail: state => {
      state.email = null;
    },
  },
});

export const {setEmail, clearEmail} = emailSlice.actions;

export default emailSlice.reducer;
