import React from "react";
import psk from "../images/paystack.png";
import { Link } from "react-router-dom";

const Transaction = () => {
  return (
    <div>
      <div className="transfer">
        <h3>Transaction Page</h3>
        <div className="account-container">
          <img src={psk} alt="flutterwave" />
        </div>
        <div className="hline"></div>
        <div className="card-container">
          <Link to={"/transferHome"} className="transaction-card">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                fill="black"
                className="bi bi-cash-stack"
                viewBox="0 0 16 16"
              >
                <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1H1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V5zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2H3z" />
              </svg>
              <h4>Transfer Money</h4>
            </div>
          </Link>
          <Link to={"/transferForm"} className="transaction-card">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="55"
                height="55"
                fill="currentblackColor"
                className="bi bi-calendar3"
                viewBox="0 0 16 16"
              >
                <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
              <h4>View Transactions</h4>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
