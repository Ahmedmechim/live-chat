import {
  CONNECT,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
  GET_PROFIL,
  GET_PROFIL_SUCCESS,
  GET_PROFIL_FAIL,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_CONVERSATION_FAIL,
  GET_MESSAGES,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_FAIL,
  CREATE_CONVERSATION_SUCCESS,
  SEND_MESSAGE,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./actionTypes";
import axios from "axios";

export const userLogin = (user) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    let res = await axios.post("/user/login", user);
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log(res.data)
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data,
    });
  }
};

export const connectInter = (interUser) => async (dispatch) => {
  dispatch({ type: CONNECT });
  try {
    let res = await axios.post("/user/internetUser", interUser);
    localStorage.setItem("token", res.data.token);
    dispatch({
      type: CONNECT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CONNECT_FAIL,
      payload: error.response.data,
    });
  }
};

export const getProfil = () => async (dispatch) => {
  dispatch({
    type: GET_PROFIL,
  });
  let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
  try {
    let res = await axios.get("/user/get", config);
    dispatch({
      type: GET_PROFIL_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFIL_FAIL,
      payload: error.response.data,
    });
  }
};

export const getconversation = (userId) => async (dispatch) => {
  dispatch({
    type: GET_CONVERSATION,
  });
  try {
    let res = await axios.get(`/conversation/getOneConversation/${userId}`);
    dispatch({
      type: GET_CONVERSATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload: error.response.data,
    });
  }
};

export const getMessages = (conversationId) => async (dispatch) => {
  dispatch({
    type: GET_MESSAGES,
  });
  try {
    let res = await axios.get(`message/getMessages/${conversationId}`);
    dispatch({
      type: GET_MESSAGES_SUCCESS,
      payload: res.data,
    }
    );
    console.log("messagess", res.data);
  } catch (error) {
    dispatch({
      type: GET_MESSAGES_FAIL,
      payload: error.response.data,
    });
  }
};

export const getDiscussion = (userId) => async (dispatch) => {
  dispatch({
    type: GET_CONVERSATION,
  });
  try {
    let res = await axios.get(`/conversation/getOneConversation/${userId}`);
    dispatch({
      type: GET_CONVERSATION_SUCCESS,
      payload: res.data,
    });
    dispatch(getMessages(res.data._id));
    console.log(res.data)
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_FAIL,
      payload: error.response.data,
    });
  }
};

export const createConversation = (userId,text) => async (dispatch) => {
  dispatch({
    type: CREATE_CONVERSATION,
  });
  try {
    let res = await axios.post(`/conversation/createConversation/${userId}`);
    dispatch({
      type: CREATE_CONVERSATION_SUCCESS,
      payload: res.data,
    });
    dispatch(sendMessage(res.data._id,text))
  } catch (error) {
    dispatch({
      type: CREATE_CONVERSATION_FAIL,
      payload: error.response.data,
    });
  }
};

export const sendMessage = (convId,text)=>async(dispatch)=>{
  dispatch({
    type: SEND_MESSAGE,
  })
  try {
    let token = localStorage.getItem("token");
  let config = {
    headers: {
      Authorization: token,
    },
  };
    let res = await axios.post(`/message/sendMessage/${convId}`,text,config);
    dispatch({
      type: SEND_MESSAGE_SUCCESS,
      payload: res.data,
    });
dispatch(getMessages(convId))
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response.data,
    });
  }
}

