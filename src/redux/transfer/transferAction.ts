import axios from "axios";
import {
  TransferAction,
  GET_BANK_LIST,
  SET_ERROR,
  SET_LOADING,
} from "../types";

export const getBankList = async () => {
  try {
    const res = await axios.get("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_PAYSTACK_API_KEY}`,
      },
    });
    const dataRes = res.data;
    console.log(dataRes.data);

    if (!res.status) {
      throw new Error(dataRes.message);
    } else {
      return {
        type: GET_BANK_LIST,
        payload: dataRes.data,
      };
    }
  } catch (err) {
    return {
      type: SET_ERROR,
      payload: err.message,
    };
  }
};

export const setLoading = (): TransferAction => {
  return {
    type: SET_LOADING,
  };
};

export const setError = (): TransferAction => {
  return {
    type: SET_ERROR,
    payload: "",
  };
};
