import { Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBankList, getRecipient, resolveAccount } from "../../redux/action";
import { RootState } from "../../redux/store";
import { ResolveAccount } from "../../types";
import PageLoader from "../PageLoader";
import CreateTransferForm from "./CreateTransferForm";

import styles from "./TransferForm.module.scss";
import { accountVerificationFormValidationSchema } from "./validator";

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

  const initialValues: TransferFormState = {
    bank: "",
    account_number: "",
  };

  const handleResolveAccount = async (values: TransferFormState) => {
    const formData: ResolveAccount = {
      account_number: values.account_number,
      bank_code: values.bank,
    };

    await dispatch(resolveAccount(formData));
    await fetchRecipient(values);
  };

  const fetchRecipient = async (values: TransferFormState) => {
    const formData = {
      name: resolve_account?.account_name,
      account_number: values.account_number,
      bank_code: values.bank,
    };
    await dispatch(getRecipient(formData));
  };

  React.useEffect(() => {
    dispatch(getBankList());
  }, [dispatch]);

  return (
    <section className={styles.TransferForm}>
      {loading ? (
        <PageLoader />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={handleResolveAccount}
          validationSchema={accountVerificationFormValidationSchema}
          enableReinitialize
          validateOnBlur={false}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form className={styles.TransferForm_form} onSubmit={handleSubmit}>
              <div className={styles.TransferForm_form_group}>
                <label htmlFor="bank">Select bank</label>
                <select
                  name="bank"
                  value={values.bank}
                  onChange={handleChange}
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
                  value={values.account_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={styles.TransferForm_form_group_input}
                />
                {touched.account_number ? (
                  <span className={styles.TransferForm_form_error}>
                    {errors.account_number}
                  </span>
                ) : undefined}
              </div>
              <button
                type="submit"
                disabled={!isValid || !dirty}
                className={styles.TransferForm_form_btn}
              >
                Confirm account
              </button>
            </form>
          )}
        </Formik>
      )}
      {loading ? (
        <PageLoader />
      ) : (
        !!resolve_account && (
          <CreateTransferForm
            recipient_code={recipient?.recipient_code!}
            account_name={resolve_account.account_name}
            error={error}
          />
        )
      )}
    </section>
  );
};

export default TransferForm;
