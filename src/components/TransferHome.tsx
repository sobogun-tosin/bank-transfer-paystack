import axios from "axios";
import React, { FormEvent, useEffect, useState } from "react";
import { AlertState } from "../redux/types";

const secret_key = "sk_test_c81d6e136f40811b18907936759c1e6409933db4";

const TransferHome = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNum, setAccountNum] = useState("");
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [alert, setAlert] = useState<AlertState>({ show: false, msg: "" });
  const [bankList, setBankList] = useState<any>([]);
  const [recipient, setRecipient] = useState("");

  const showAlert = (show = false, msg = "") => {
    setAlert({ show, msg });
  };
  const clearAlert = () => {
    setTimeout(() => {
      showAlert(false, "");
    }, 5000);
  };

  const getBankList = async () => {
    setLoading(true);
    const res = await axios.get("https://api.paystack.co/bank", {
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });
    const dataRes = res.data;
    setLoading(false);
    setBankList(dataRes.data);
  };

  const resolveAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await axios.get(
        `https://api.paystack.co/bank/resolve?account_number=${accountNum}&bank_code=${bankName}`,
        {
          headers: {
            Authorization: `Bearer ${secret_key}`,
          },
        }
      );
      const data = res.data.data;
      const newName = data.account_name;
      if (!res.status) {
        return new Error(res.data.message);
      } else {
        setName(newName);
        getRecipient();
        setSubmitting(false);
        setShowForm(true);
      }
    } catch (err) {
      setSubmitting(false);
      showAlert(true, err.mesage);
      clearAlert();
    }
  };

  const getRecipient = async () => {
    const myFormData = {
      type: "nuban",
      name: name,
      account_number: accountNum,
      bank_code: `${bankName}`,
      currency: "NGN",
    };
    try {
      const res = await axios.post(
        "https://api.paystack.co/transferrecipient",
        myFormData,
        {
          headers: {
            Authorization: `Bearer ${secret_key}`,
            "Content-Type": "application/json",
          },
        }
      );
      const dataRes = res.data;
      if (!res.status) {
        throw new Error(dataRes.message);
      } else {
        const newRecipient = dataRes.data.recipient_code;
        setRecipient(newRecipient);
      }
    } catch (err) {
      setSubmitting(false);
      showAlert(true, err.message);
      clearAlert();
    }
  };

  const makeTransfer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const myForm = {
      source: "balance",
      amount: `${amount}`,
      recipient: recipient,
      reason: description,
    };
    try {
      const res = await axios.post(`https://api.paystack.co/transfer`, myForm, {
        headers: {
          Authorization: `Bearer ${secret_key}`,
          "Content-Type": "application/json",
        },
      });
      const dataRes = res.data;
      if (!res.status) {
        throw new Error(dataRes.message);
      } else {
        console.log(res.data);
        setSubmitting(false);
      }
    } catch (err) {
      setSubmitting(false);
      showAlert(true, err.message);
      clearAlert();
    }
  };

  useEffect(() => {
    getBankList();
  }, []);

  if (loading) {
    return <h1 className="transfer transfer-home">Loading...</h1>;
  }

  return (
    <div className="transfer">
      <div className="transfer-home">
        <h3>Transfer Home Component</h3>
        <form onSubmit={resolveAccount}>
          <label htmlFor="bank" className="form-select">
            select bank
            <select
              id="bank"
              value={bankName}
              onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                setBankName(e.currentTarget.value)
              }
            >
              {bankList.map((item: any, index: number) => {
                const { name, code } = item;
                return (
                  <option value={code} key={index}>
                    {name}
                  </option>
                );
              })}
            </select>
          </label>
          <label htmlFor="account-no" className="form-label">
            Account Number
            <input
              type="number"
              id="account-no"
              placeholder="enter account number"
              value={accountNum}
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                setAccountNum(e.currentTarget.value)
              }
            />
          </label>
          {alert.show && <p className="alert">{alert.msg}</p>}
          <button>confirm account</button>
        </form>
        {submitting && <h3>Processing...</h3>}
        {showForm && (
          <div className="transfer-form">
            <h3>{name}</h3>
            <form onSubmit={makeTransfer}>
              <label htmlFor="amount" className="form-label">
                Amount
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  placeholder="enter amount"
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setAmount(parseInt(e.currentTarget.value))
                  }
                />
              </label>
              <label htmlFor="description" className="form-label">
                Description
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e: React.FormEvent<HTMLInputElement>) =>
                    setDescription(e.currentTarget.value)
                  }
                  placeholder="enter description"
                />
              </label>
              {alert.show && <p className="alert"> {alert.msg} </p>}
              <button>Transfer</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransferHome;
