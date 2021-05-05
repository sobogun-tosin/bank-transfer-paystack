import axios from "axios";
import React, { useEffect, useState, FormEvent } from "react";

const url = "https://api.paystack.co/transfer";
const bankUrl = "https://api.paystack.co/bank";
const public_key = "sk_test_c81d6e136f40811b18907936759c1e6409933db4";

const Test = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [accNum, setAccNum] = useState(0);
  const [list, setList] = useState<any>([]);
  const [bankName, setBankName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const getBankUrl = async () => {
    const res = await fetch(bankUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${public_key}`,
      },
    });
    const bankList = await res.json();
    const data = bankList.data;
    console.log(data);
    setList(data);
  };

  const confirmBankAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://api.paystack.co/bank/resolve?account_number=${accNum}&bank_code=${bankName}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${public_key}`,
          },
        }
      );
      const info = await res.json();
      const bankDetails = info.data;
      console.log(info);
      const newName = bankDetails.account_name;
      const newAccNum = bankDetails.account_number;
      if (info.status) {
        setName(newName);
        setAccNum(newAccNum);

        getRecipient();
      }
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const getRecipient = async () => {
    const myFormData = {
      type: "nuban",
      name: name,
      account_number: `${accNum}`,
      bank_code: `${bankName}`,
      currency: "NGN",
    };

    try {
      const res = await axios.post(
        "https://api.paystack.co/transferrecipient",
        myFormData,
        {
          headers: {
            Authorization: `Bearer ${public_key}`,
            "Content-Type": "application/json",
          },
        }
      );
      const dataRes = res.data.data;
      const recipientCode = dataRes.recipient_code;
      setRecipient(recipientCode);
      console.log(dataRes);
    } catch (err) {
      setErrMsg(err.message);
    }
  };

  const makeTransfer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myForm = {
      source: "balance",
      amount: `${amount}`,
      recipient: recipient,
      reason: description,
    };

    try {
      const res = await axios.post(`https://api.paystack.co/transfer`, myForm, {
        headers: {
          Authorization: `Bearer ${public_key}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBankUrl();
  }, []);

  return (
    <div style={{ margin: "10px auto", width: "70%" }}>
      <h4>Test api</h4>
      <form onSubmit={confirmBankAccount}>
        <label htmlFor="bankList">
          Select Bank:
          <select
            name="bankList"
            id="bankList"
            value={bankName}
            onChange={(e: FormEvent<HTMLSelectElement>) =>
              setBankName(e.currentTarget.value)
            }
            style={{ width: "100%", margin: "10px", padding: "10px" }}
          >
            {list.map((item: any, index: number) => {
              const { name, code } = item;
              return (
                <option value={code} key={index}>
                  {name}
                </option>
              );
            })}
          </select>
        </label>
        <label htmlFor="accNum">
          Account Number
          <input
            type="number"
            id="accNum"
            style={{ width: "100%", margin: "10px", padding: "10px" }}
            value={accNum}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setAccNum(parseInt(e.currentTarget.value))
            }
          />
        </label>
        {errMsg}
        <button type="submit"> confirm</button>
      </form>
      <form onSubmit={makeTransfer}>
        {name}
        <label htmlFor="amount">
          Amount:
          <input
            style={{ width: "100%", margin: "10px", padding: "10px" }}
            id="amount"
            type="number"
            placeholder="Enter amount here..."
            value={amount}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setAmount(parseInt(e.currentTarget.value))
            }
            required
          />
        </label>
        <label htmlFor="desc">
          Description:
          <input
            style={{ width: "100%", margin: "10px", padding: "10px" }}
            id="desc"
            type="text"
            placeholder="Enter description here..."
            value={description}
            onChange={(e: FormEvent<HTMLInputElement>) =>
              setDescription(e.currentTarget.value)
            }
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Test;
