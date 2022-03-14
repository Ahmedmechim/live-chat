import {SIGNUP} from "./actionTypes";

let init ={
 user:null
}
 
const reducer =(state=init,{type,payload})=>{
    switch (type) {
        case SIGNUP:
            return state
    
        default:
            return state
    }

}
export default reducer