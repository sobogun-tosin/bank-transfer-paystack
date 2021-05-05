import {
  TransferAction,
  TransferState,
  GET_BANK_LIST,
  SET_ERROR,
  SET_LOADING,
  RESOLVE_ACCOUNT,
} from "../types";

const initialState: TransferState = {
  data: null,
  loading: false,
  error: "",
};

const transferReducer = (state = initialState, action: TransferAction) => {
  switch (action.type) {
    case GET_BANK_LIST:
      return {
        ...state,
        data: action.payload,
      };
    case RESOLVE_ACCOUNT:
      return {
        ...state,
        data: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default transferReducer;
