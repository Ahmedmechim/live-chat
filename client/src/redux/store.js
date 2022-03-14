import {createStore,compose,applyMiddleware} from "redux"
import reducer  from "./reducer"
import thunk from "redux-thunk"
let devtools=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store=createStore(reducer,compose(applyMiddleware(thunk),devtools))

export default store