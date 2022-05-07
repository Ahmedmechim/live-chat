import {
  ADD_MESSAGE,
  CONNECT,
  CONNECT_FAIL,
  CONNECT_SUCCESS,
  CREATE_CONVERSATION,
  CREATE_CONVERSATION_FAIL,
  CREATE_CONVERSATION_SUCCESS,
  GET_ALL_CONVERSATIONS,
  GET_ALL_CONVERSATIONS_FAIL,
  GET_ALL_CONVERSATIONS_SUCCESS,
  GET_ALL_MESSAGES,
  GET_ALL_MESSAGES_FAIL,
  GET_ALL_MESSAGES_SUCCESS,
  GET_CONVERSATION,
  GET_CONVERSATION_FAIL,
  GET_CONVERSATION_SUCCESS,
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_SUCCESS,
  GET_PROFIL,
  GET_PROFIL_FAIL,
  GET_PROFIL_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from "./actionTypes";

let init = {
  user: null,
  users: null,
  errors: null,
  isAuth: false,
  allConversations: null,
  conversation: null,
  messages: null,
  notSeenMessages: null,
  pic: "https://cdn-icons-png.flaticon.com/512/3447/3447687.png",
  token: localStorage.getItem("token"),
};

const reducer = (state = init, { type, payload }) => {
  switch (type) {
    case CONNECT:
    case GET_PROFIL:
    case CREATE_CONVERSATION:
    case GET_CONVERSATION:
    case GET_MESSAGES:
    case LOGIN:
    case GET_ALL_CONVERSATIONS:
    case GET_USERS:
    case GET_ALL_MESSAGES:
      return{ ...state,
      errors:null
      };

    case CONNECT_FAIL:
    case GET_PROFIL_FAIL:
    case CREATE_CONVERSATION_FAIL:
    case GET_CONVERSATION_FAIL:
    case GET_MESSAGES_FAIL:
    case LOGIN_FAIL:
    case GET_ALL_CONVERSATIONS_FAIL:
    case GET_USERS_FAIL:
    case GET_ALL_MESSAGES_FAIL:
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
        user: payload.thisUser,
        token: payload.token,
      };

    case GET_PROFIL_SUCCESS:
      return {
        ...state,
        isAuth: true,
      };

    case CREATE_CONVERSATION_SUCCESS:
      return {
        ...state,
        conversation: payload,
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

    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };

    case GET_ALL_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        allConversations: payload,
      };

    case GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload,
      };

    case GET_ALL_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: payload,
      };

    default:
      return state;
  }
};
export default reducer;
