import { combineReducers } from "redux";
import transferReducer from "./transfer/transferReducer";

export const rootReducer = combineReducers({ transfer: transferReducer });
