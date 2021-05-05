import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { getBankList } from "../redux/transfer/transferAction";

const Transfer = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [phone, setPhone] = useState(0);
  const [description, setDescription] = useState("");
  const [bankName, setBankName] = useState("");

  const bankList = useSelector((state: RootState) => state.transfer.data);
  const loading = useSelector((state: RootState) => state.transfer.loading);

  console.log(bankList);

  useEffect(() => {
    dispatch(getBankList);
  }, []);

  return (
    <div className="transfer">
      <div className="transfer-home">
        <h3>Transfer component</h3>
        <form>
          <label htmlFor="bank" className="form-select">
            select bank
            <select
              id="bank"
              value={bankName}
              onChange={(e: React.FormEvent<HTMLSelectElement>) =>
                setBankName(e.currentTarget.value)
              }
            >
              {bankList === null ? (
                <p>Loading...</p>
              ) : (
                bankList.map((item: any, index: number) => {
                  const { name, code } = item;
                  return (
                    <option value={code} key={index}>
                      {name}
                    </option>
                  );
                })
              )}
            </select>
          </label>
          <label htmlFor="name" className="form-label">
            Name
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setName(e.currentTarget.value)
              }
            />
          </label>
          <label htmlFor="amount" className="form-label">
            Amount
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setAmount(parseInt(e.currentTarget.value))
              }
            />
          </label>
          <label htmlFor="phone" className="form-label">
            Phone Number
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setPhone(parseInt(e.currentTarget.value))
              }
            />
          </label>
          <label htmlFor="desc" className="form-label">
            Description
            <input
              type="text"
              id="desc"
              value={description}
              onChange={(e: FormEvent<HTMLInputElement>) =>
                setDescription(e.currentTarget.value)
              }
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Transfer;
