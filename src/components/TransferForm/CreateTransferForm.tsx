import { Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { makeTransfer } from "../../redux/action";
import { CreateTransferFormState } from "./TransferForm";
import styles from "./TransferForm.module.scss";
import { completeTransferValidationSchema } from "./validator";

interface CreateTransferFormProps {
  account_name: string;
  error: string;
  recipient_code: string;
}

const CreateTransferForm: React.FC<CreateTransferFormProps> = ({
  account_name,
  recipient_code,
  error,
}) => {
  const initialValues: CreateTransferFormState = {
    amount: "",
    description: "",
  };

  const dispatch = useDispatch();

  const handleTransfer = (values: CreateTransferFormState) => {
    const formData = {
      amount: values.amount,
      recipient: recipient_code,
      reason: values.description,
    };
    dispatch(makeTransfer(formData));
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleTransfer}
      enableReinitialize
      validationSchema={completeTransferValidationSchema}
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
          <span className={styles.TransferForm_form_name}>{account_name}</span>
          <div className={styles.TransferForm_form_group}>
            <label htmlFor="amount" className="form-label">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={values.amount}
              placeholder="enter amount"
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.TransferForm_form_group_input}
            />
            {touched.amount ? (
              <span className={styles.TransferForm_form_error}>
                {errors.amount}
              </span>
            ) : undefined}
          </div>
          <div className={styles.TransferForm_form_group}>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              className={styles.TransferForm_form_group_input}
              placeholder="enter description"
            />
            {touched.description ? (
              <span className={styles.TransferForm_form_error}>
                {errors.description}
              </span>
            ) : undefined}
          </div>
          <button
            type="submit"
            disabled={!isValid || !dirty}
            className={styles.TransferForm_form_btn}
          >
            Transfer
          </button>
          {error && (
            <span className={styles.TransferForm_form_error}>{error}</span>
          )}
        </form>
      )}
    </Formik>
  );
};

export default CreateTransferForm;
