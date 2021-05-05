import { AlertState, AlertAction, SET_ALERT } from "../types";

const initialState: AlertState = {
  msg: "",
  show: false,
};

const alertReducer = (
  state = initialState,
  action: AlertAction
): AlertState => {
  switch (action.type) {
    case SET_ALERT:
      return {
        ...state,
        msg: action.payload,
      };
    default:
      return state;
  }
};
