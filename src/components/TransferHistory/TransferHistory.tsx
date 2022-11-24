import React from "react";
import styles from "./TransferHistory.module.scss";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const TransferHistory = () => {
  const list = getLocalStorage();
  return (
    <section className={styles.TransferHistory}>
      {list.length === 0 ? (
        <h3 className={styles.TransferHistory}>No Transfer History</h3>
      ) : (
        <>
          <p style={{ cursor: "pointer", textAlign: "center" }}>
            Transfer History
          </p>
          {list.map((item: any, id: number) => {
            const { customer, amount, status } = item;
            return (
              <div className={styles.TransferHistory_details} key={id}>
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
        </>
      )}
    </section>
  );
};

export default TransferHistory;
