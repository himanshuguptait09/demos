import _ from "lodash";
import * as types from "../Actions/Login";

const initialState = {
  userData: {
    permission: {
      Dashboard: true,
      Register: true,
      Report: true,
      Bpmn: true,
      SideBar: true,
      Masters_Listing: true,
      Master_Listing: true,
      User_Management: true,
      regularurgentrequest: true,
      multilingualrequest: true,
      task_listing: true,
      CoordinatorTaskForm: true,
    },
  },
  login_user_details: {},
  active_routes: [],
  tabs: [],
  select_member_info: {
    data: "",
    userRegistered: "",
    mobileNo: "",
  },
  login_info: {
    loggedIn: false,
    data: "",
    userRegistered: "",
    mobileNo: "",
  },
};

export default function Login(state = initialState, actions) {
  switch (actions.type) {
    case types.LOGGED_IN_USER_DATA:
      return {
        ...state,
        userData: actions.payload,
      };
    case types.SET_LOGGED_IN_USER_DETAILS:
      return {
        ...state,
        login_user_details: actions.payload,
      };
    case types.CHANGE_USER_PERMISSION:
      return {
        ...state,
        userData: {
          permission: actions.payload?.userData,
        },
        active_routes: actions.payload?.active_routes,
        login_user_details: actions.payload?.login_user_details,
        tabs: actions.payload?.tabs,
      };
    case types.SET_IS_LOGGEDIN:
      return {
        ...state,
        login_info: {
          loggedIn: actions?.payload?.loggedIn,
          data: actions?.payload?.data,
          userRegistered: actions?.payload?.userRegistered,
          mobileNo: actions?.payload?.mobileNo,
        },
      };
    case types.SET_IS_LOGGEDOUT:
      return {
        ...state,
        login_info: {
          loggedIn: false,
          data: "",
          userRegistered: "",
          mobileNo: "",
        },
        select_member_info: {
          data: "",
          userRegistered: "",
          mobileNo: "",
        },
      };
    case types.SET_SELECT_MEMBER_INFO:
      return {
        ...state,
        select_member_info: {
          data: actions?.payload?.data,
          userRegistered: actions?.payload?.userRegistered,
          mobileNo: actions?.payload?.mobileNo,
        },
      };
    default:
      return {
        ...state,
      };
  }
}
