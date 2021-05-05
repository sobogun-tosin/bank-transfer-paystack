import axios from "axios";
import { useEffect, useState } from "react";

const secret_key = "sk_test_c81d6e136f40811b18907936759c1e6409933db4";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const TransferForm = () => {
  const [list, setList] = useState(getLocalStorage());

  const getTransferList = async () => {
    try {
      const res = await axios.get(`https://api.paystack.co/transfer`, {
        headers: {
          Authorization: `Bearer ${secret_key}`,
        },
      });
      const dataRes = res.data;
      console.log(dataRes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTransferList();
  }, []);

  return (
    <div className="transfer transaction-content">
      {list.map((item: any, id: number) => {
        const { customer, description, amount, status } = item;
        return (
          <div className="transaction-details" key={id}>
            <h4>
              Name: <span>{customer.name}</span>
            </h4>
            <h4>
              Date: <span>{new Date().toLocaleDateString()}</span>
            </h4>
            <h4>
              Amount: <span>₦{amount}</span>
            </h4>
            <h4>
              Phone Number: <span>{customer.phone_number}</span>
            </h4>
            <h4>
              Status: <span>{status}</span>
            </h4>
            <h4>
              Email: <span>{customer.email}</span>
            </h4>
          </div>
        );
      })}
      {list.length === 0 ? (
        <h3 style={{ textAlign: "center" }}>No Transfer History</h3>
      ) : (
        <p style={{ cursor: "pointer", textAlign: "center" }}>
          Transfer History
        </p>
      )}
    </div>
  );
};

export default TransferForm;
