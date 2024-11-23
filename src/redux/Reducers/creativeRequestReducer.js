
import _ from "lodash";
import * as types from "../Actions/creativeRequest";

const initialState = {
    crative_request_data: {
    }
}



export default function Master(state = initialState, actions) {
    switch (actions.type) {
        case types.SET_CURRENT_CREATIVE_REQUEST_DATA: return {
            ...state,
            crative_request_data: actions.payload
        }
        default: return {
            ...state
        }
    }

}