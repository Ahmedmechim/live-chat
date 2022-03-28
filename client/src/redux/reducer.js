import {
  CONNECT,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
  GET_CONVERSATION,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_PROFIL,
  GET_PROFIL_FAIL,
  GET_PROFIL_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "./actionTypes";

let init = {
  user: null,
  errors: null,
  isAuth: false,
  conversation: null,
  messages:null,
  pic:"https://cdn-icons-png.flaticon.com/512/3447/3447687.png",
  token: localStorage.getItem("token"),
};

const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case CONNECT:
    case GET_PROFIL:
    case GET_CONVERSATION:
    case GET_MESSAGES:
    case LOGIN:
      return state;
    case CONNECT_FAIL:
    case GET_PROFIL_FAIL:
    case GET_CONVERSATION_FAIL:
    case GET_MESSAGES_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        errors: payload,
      };
    case CONNECT_SUCCESS:
      return {
        ...state,
        user: payload.aUser,
        errors: null,
        token: payload.token,
      };
    case LOGIN_SUCCESS:
      return {
  ...state, 
  user:payload.thisUser,
  token:payload.token
      };
    case GET_PROFIL_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };
    case GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversation: payload,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
      };
    default:
      return state;
  }
};
export default reducer;
