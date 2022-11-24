import React from "react";
import styles from "./Home.module.scss";
import { Link } from "react-router-dom";
import { CalendatIcon, CashStackIcon } from "../../assets/svgs";
import PSK from "../../assets/images/paystack.png";

const Home = () => {
  return (
    <div className={styles.Home}>
      <div className={styles.Home_header}>
        <h3 className={styles.Home_header_text}>Bank with Paystack</h3>
        <div className={styles.Home_header_imgContainer}>
          <img src={PSK} alt="pay-stack" />
        </div>
      </div>
      <div className="hline"></div>
      <div className={styles.Home_container}>
        <Link to={"/"} className={styles.Home_container_links}>
          <div>
            <CashStackIcon />
            <h4>Create Transfer</h4>
          </div>
        </Link>
        <Link to={"/transfer_history"} className={styles.Home_container_links}>
          <div>
            <CalendatIcon />
            <h4>Transfer History</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
