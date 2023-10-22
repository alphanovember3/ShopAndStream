import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null,
  userreward : 0
}

const authSlice = createSlice({
  name : 'auth',
  initialState,
  reducers : {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    setReward : (state,action) => {
      state.userreward = action.payload;
    },
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
  }
})

export const { setCredentials,setReward, logout } = authSlice.actions;

export default authSlice.reducer;