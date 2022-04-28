import { combineReducers } from "redux";
import { transferReducer } from "./reducer";

export const rootReducer = combineReducers({ transfer: transferReducer });
