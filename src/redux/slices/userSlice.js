import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,

    isFetching: false,
    error: false,
  },
  reducers: {
    //LOGIN PROCCESS
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      // console.log(err)
      state.isFetching = false;
      state.error = true;
    },
    //REGISTER PROCCESS
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //LOGOUT PROCCESS
    logOutStart: (state) => {
      state.isFetching = true;
    },
    logOutSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = null;
      state.allUsers = null;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logOutSuccess,
  logOutStart,
} = userSlice.actions;
export default userSlice.reducer;
