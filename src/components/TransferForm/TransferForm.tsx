import React, { FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBankList,
  getRecipient,
  resolveAccount,
  makeTransfer,
} from "../../redux/action";
import { RootState } from "../../redux/store";
import { ResolveAccount } from "../../types";
import PageLoader from "../PageLoader";
import CreateTransferForm from "./CreateTransferForm";

import styles from "./TransferForm.module.scss";

interface TransferFormState {
  bank: string;
  account_number: string;
}
export interface CreateTransferFormState {
  amount: string;
  description: string;
}

const TransferForm: React.FC = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: RootState) => state.transfer);
  const { banks, loading, resolve_account, error, recipient } = transfer;

  const initialState: TransferFormState = {
    bank: "",
    account_number: "",
  };

  const [state, setState] = React.useState<TransferFormState>(initialState);

  const handleChange = (newState: Partial<TransferFormState>) => {
    setState((state) => ({ ...state, ...newState }));
  };

  const handleResolveAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData: ResolveAccount = {
      account_number: state.account_number,
      bank_code: state.bank,
    };

    dispatch(resolveAccount(formData));
    fetchRecipient();
  };

  const fetchRecipient = () => {
    const formData = {
      name: resolve_account?.account_name,
      account_number: state.account_number,
      bank_code: state.bank,
    };
    dispatch(getRecipient(formData));
  };

  React.useEffect(() => {
    dispatch(getBankList());
  }, [dispatch]);

  return (
    <section className={styles.TransferForm}>
      {loading ? (
        <PageLoader />
      ) : (
        <form
          className={styles.TransferForm_form}
          onSubmit={handleResolveAccount}
        >
          <div className={styles.TransferForm_form_group}>
            <label htmlFor="bank">Select bank</label>
            <select
              name="bank"
              value={state.bank}
              onChange={(e: FormEvent<HTMLSelectElement>) =>
                handleChange({ bank: e.currentTarget.value })
              }
              className={styles.TransferForm_form_group_input}
            >
              {banks.map((item: any, index: number) => {
                const { name, code } = item;
                return (
                  <option value={code} key={index}>
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={styles.TransferForm_form_group}>
            <label htmlFor="account-no">Account Number</label>
            <input
              type="text"
              id="account_number"
              name="account_number"
              placeholder="enter account number"
              value={state.account_number}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                handleChange({ account_number: e.currentTarget.value })
              }
              className={styles.TransferForm_form_group_input}
            />
          </div>
          <button type="submit" className={styles.TransferForm_form_btn}>
            Confirm account
          </button>
        </form>
      )}
      {!!resolve_account && (
        <>
          <CreateTransferForm
            recipient_code={recipient?.recipient_code}
            account_name={resolve_account.account_name}
            error={error}
          />
        </>
      )}
    </section>
  );
};

export default TransferForm;
