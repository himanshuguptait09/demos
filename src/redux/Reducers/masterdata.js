import _ from "lodash";
import * as types from "../Actions/masterdata";

const initialState = {
  masters: {},
  siteData: "",
};

export default function master(state = initialState, actions) {
  switch (actions.type) {
    case types.SET_MASTER_DATA:
      return {
        ...state,
        masters: actions.payload,
      };

    case types.SET_SITE_DATA:
      return {
        ...state,
        siteData: actions.payload,
      };

    default:
      return {
        ...state,
      };
  }
}
