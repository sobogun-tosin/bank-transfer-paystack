import React, { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { makeTransfer } from "../../redux/action";
import { CreateTransferFormState } from "./TransferForm";
import styles from "./TransferForm.module.scss";

interface CreateTransferFormProps {
  account_name: string;
  error: string;
  recipient_code?: string;
}

const CreateTransferForm: React.FC<CreateTransferFormProps> = ({
  account_name,
  recipient_code,
  error,
}) => {
  const initialValue: CreateTransferFormState = {
    amount: "",
    description: "",
  };

  const dispatch = useDispatch();

  const [state, setState] =
    React.useState<CreateTransferFormState>(initialValue);

  const handleChange = (newState: Partial<CreateTransferFormState>) => {
    setState((state) => ({ ...state, ...newState }));
  };

  const handleTransfer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      amount: state.amount,
      recipient: recipient_code,
      reason: state.description,
    };
    dispatch(makeTransfer(formData));
  };
  return (
    <form className={styles.TransferForm_form} onSubmit={handleTransfer}>
      <span className={styles.TransferForm_form_name}>{account_name}</span>
      <div className={styles.TransferForm_form_group}>
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          type="text"
          id="amount"
          value={state.amount}
          placeholder="enter amount"
          onChange={(e: FormEvent<HTMLInputElement>) =>
            handleChange({ amount: e.currentTarget.value })
          }
          className={styles.TransferForm_form_group_input}
        />
      </div>
      <div className={styles.TransferForm_form_group}>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={state.description}
          onChange={(e: FormEvent<HTMLInputElement>) =>
            handleChange({ description: e.currentTarget.value })
          }
          className={styles.TransferForm_form_group_input}
          placeholder="enter description"
        />
      </div>
      {error && <span className={styles.TransferForm_form_error}>{error}</span>}
      <button type="submit" className={styles.TransferForm_form_btn}>
        Transfer
      </button>
    </form>
  );
};

export default CreateTransferForm;
