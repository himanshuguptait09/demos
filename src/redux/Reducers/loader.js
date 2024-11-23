
import _ from "lodash";
import * as types from "../Actions/loader";

const initialState = {
   loaderState:false
}



export default function Loader(state = initialState, actions) {
    switch (actions.type) {
        case types.SHOW_LOADER: return {
            ...state,
            loaderState : actions.payload
        }
        case types.HIDE_LOADER: return {
            ...state,
            loaderState : actions.payload
        }
        default: return {
            ...state
        }
    }

}