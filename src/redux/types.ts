export const SET_LOADING = "SET_LOADING";
export const GET_BANK_LIST = "GET_BANK_LIST";
export const SET_ALERT = "SET_ALERT";
export const SET_ERROR = "SET_ERROR";
export const RESOLVE_ACCOUNT = "RESOLVE_ACCOUNT";
export const GET_RECIPIENT = "GET_RECIPIENT";

export interface BankList {
  code: number;
  name: string;
}
export interface BankListData {
  name: string;
  slug: string;
  code: number;
  longcode: string;
  gateway: null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResolveAccount {
  account_name: string;
  accounnt_number: number;
}

export interface Recipient {}

export interface TransferState {
  data: any | null;
  error: string;
  loading: boolean;
}

export interface TransferError {
  message: string;
  status: boolean;
}

interface GetBankListAction {
  type: typeof GET_BANK_LIST;
  payload: BankListData;
}

interface GetResolveAccount {
  type: typeof RESOLVE_ACCOUNT;
  payload: ResolveAccount;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

export type TransferAction =
  | GetBankListAction
  | GetResolveAccount
  | SetLoadingAction
  | SetErrorAction;

export interface AlertState {
  show: boolean;
  msg: string;
}

export interface AlertAction {
  type: typeof SET_ALERT;
  payload: string;
}
