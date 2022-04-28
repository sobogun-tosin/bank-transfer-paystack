import { BankList, RecipientData, ResolvedAccountType } from "../types";
import * as TYPES from "./actionTypes";

interface TrasnferReducer {
  banks: BankList[];
  recipient: RecipientData | undefined;
  transactions: any;
  resolve_account: ResolvedAccountType | null;
  loading: boolean;
  error: string;
}

const DEFAULT_STATE: TrasnferReducer = {
  loading: false,
  banks: [],
  transactions: [],
  resolve_account: null,
  recipient: undefined,
  error: "",
};

export const transferReducer = (
  state = DEFAULT_STATE,
  action: TYPES.TransferAction
) => {
  switch (action.type) {
    case TYPES.LOADING:
      return { ...state, loading: true };
    case TYPES.GET_BANK_LIST:
      return {
        ...state,
        loading: false,
        banks: action.payload,
      };
    case TYPES.GET_RESOLVE_ACCOUNT:
      return { ...state, resolve_account: action.payload };
    case TYPES.GET_RECIPIENT:
      return {
        ...state,
        loading: false,
        recipient: action.payload,
      };
    case TYPES.GET_TRANSACTION_LIST:
      return {
        ...state,
        loading: false,
        transactions: action.payload,
      };
    case TYPES.ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
