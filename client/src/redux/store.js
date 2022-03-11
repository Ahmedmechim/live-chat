import { createStore } from "redux";
import listeReducer from "./reducer";



let store=createStore(listeReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default store