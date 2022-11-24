import { BankListData, RecipientData, ResolvedAccountType } from "../types";
export const LOADING = "LOADING";
export const GET_BANK_LIST = "GET_BANK_LIST";
export const GET_RECIPIENT = "GET_RECIPIENT";
export const ERROR = "SET_ERROR";
export const GET_TRANSACTION_LIST = "GET_TRANSACTION_LIST";
export const GET_RESOLVE_ACCOUNT = "GET_RESOLVE_ACCOUNT";

interface GetBankListAction {
  type: typeof GET_BANK_LIST;
  payload: BankListData[];
}

interface GetTransactionList {
  type: typeof GET_TRANSACTION_LIST;
  payload: any;
}

interface SetLoadingAction {
  type: typeof LOADING;
}

interface SetErrorAction {
  type: typeof ERROR;
  payload: string;
}

interface GetResolvedAccount {
  type: typeof GET_RESOLVE_ACCOUNT;
  payload: ResolvedAccountType;
}

interface GetRecipient {
  type: typeof GET_RECIPIENT;
  payload: RecipientData;
}

export type TransferAction =
  | GetBankListAction
  | GetTransactionList
  | GetResolvedAccount
  | GetRecipient
  | SetLoadingAction
  | SetErrorAction;
