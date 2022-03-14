import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SIGNUP,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const userSignUp = (newUser) => async (dispatch) => {
  dispatch({ type: SIGNUP });
  try {
    const signUpRes = await axios.post("/user/signUp", newUser);
    // console.log("res", signUpRes.data);
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: signUpRes.data,
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAIL,
      payload: error.response.data,
    });
    if (error.response.data.msg === "try an other email") {
      dispatch({ type: LOGIN });
      try {
        const res = await axios.post("/user/login", newUser);
        localStorage.setItem("token", res.data.token);
        // console.log(res.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data,
        });
      }
    } else {
      dispatch({ type: LOGIN });
      try {
        const res = await axios.post("/user/login", newUser);
        localStorage.setItem("token", res.data.token);
        // console.log(res.data);
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      } catch (error) {
        dispatch({
          type: LOGIN_FAIL,
          payload: error.response.data,
        });
      }
    }
  }
};
