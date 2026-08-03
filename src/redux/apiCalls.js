import { publicRequest } from "../requestMethods";
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from "./slices/userSlice";

export const login = async (dispatch, user, navigate, setErr) => {
  dispatch(loginStart());
  console.log("helooooooooooo");
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    console.log("helooooooooooo");
    navigate("/");
  } catch (err) {
    setErr(err);
    console.log(err);
    dispatch(loginFailure());
  }
};
export const register = async (dispatch, user, navigate) => {
  dispatch(registerStart());
  try {
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registerSuccess(res.data));
    console.log(res.data);
    navigate("/");
  } catch (err) {
    console.log(err);
    dispatch(registerFailure());
  }
};
