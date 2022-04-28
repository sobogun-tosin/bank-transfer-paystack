import { Dispatch } from "redux";
import {
  ERROR,
  GET_BANK_LIST,
  GET_RECIPIENT,
  LOADING,
  GET_TRANSACTION_LIST,
  TransferAction,
  GET_RESOLVE_ACCOUNT,
} from "./actionTypes";
import { CreateTransfer, Recipient, ResolveAccount } from "../types";
import { Axios } from "../helpers/axios";
import { bank_api, recipient_api, transfer_api } from "../configs/apiConfig";

export const getBankList = () => async (dispatch: Dispatch<TransferAction>) => {
  dispatch({ type: LOADING });
  try {
    const res = await Axios.get(bank_api);
    const dataRes = res.data;
    if (!dataRes.status) {
      throw new Error(dataRes.message);
    }
    dispatch({
      type: GET_BANK_LIST,
      payload: dataRes.data,
    });
  } catch (error: any) {
    dispatch({ type: ERROR, payload: error.message });
  }
};

export const resolveAccount =
  (formData: ResolveAccount) => async (dispatch: Dispatch<TransferAction>) => {
    try {
      const res = await Axios.get(
        `${bank_api}/resolve?account_number=${formData.account_number}&bank_code=${formData.bank_code}`
      );
      const dataRes = res.data;
      if (!dataRes.status) {
        throw new Error(dataRes.message);
      }
      dispatch({
        type: GET_RESOLVE_ACCOUNT,
        payload: dataRes.data,
      });
    } catch (error: any) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const getRecipient =
  (formData: Recipient) => async (dispatch: Dispatch<TransferAction>) => {
    try {
      const form = {
        type: "nuban",
        name: formData.name,
        account_number: formData.account_number,
        bank_code: formData.bank_code,
        currency: "NGN",
      };

      const res = await Axios.post(`${recipient_api}`, form);
      const dataRes = res.data;
      if (!dataRes.status) {
        throw new Error(dataRes.message);
      }
      dispatch({
        type: GET_RECIPIENT,
        payload: dataRes.data,
      });
    } catch (error: any) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };

export const makeTransfer =
  (formData: CreateTransfer) => async (dispatch: Dispatch<TransferAction>) => {
    try {
      const form = {
        source: "balance",
        amount: formData.amount,
        recipient: formData.recipient,
        reason: formData.reason,
      };
      const res = await Axios.post(`${transfer_api}`, form);
      const dataRes = res.data;
      if (!res.status) {
        throw new Error(dataRes.message);
      }
    } catch (error: any) {
      console.error(error);
      dispatch({
        type: ERROR,
        payload: "Your balance is not enough to fulfil this request",
      });
    }
  };

export const getTransactionList =
  () => async (dispatch: Dispatch<TransferAction>) => {
    try {
      const res = await Axios.get(transfer_api);
      const dataRes = res.data;
      if (!dataRes.status) {
        throw new Error(dataRes.message);
      }
      dispatch({
        type: GET_TRANSACTION_LIST,
        payload: dataRes.data,
      });
    } catch (error: any) {
      dispatch({ type: ERROR, payload: error.message });
    }
  };
