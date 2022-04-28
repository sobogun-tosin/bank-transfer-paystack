import React from "react";
import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <section className={styles.ErrorPage}>
      <h1>Ooops!,</h1>
      <p>Sorry someting went wrong.</p>
    </section>
  );
};

export default ErrorPage;
