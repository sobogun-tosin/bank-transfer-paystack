import { AlertAction, SET_ALERT } from "../types";

export const setAlert = (msg: string): AlertAction => {
  return {
    type: SET_ALERT,
    payload: msg,
  };
};
