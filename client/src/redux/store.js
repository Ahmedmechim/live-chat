import  reducer  from "./reducer";
import thunk from "redux-thunk";
import {createStore,applyMiddleware,compose} from "redux"
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'

let devtools=window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
let persistConfig = {
    key: 'root',
    storage,
  }
const persistedReducer = persistReducer(persistConfig,reducer)
export const store=createStore(persistedReducer,compose(applyMiddleware(thunk),devtools))
export const persistor = persistStore(store)