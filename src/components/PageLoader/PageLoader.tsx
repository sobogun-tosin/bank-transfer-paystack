import React from "react";
import { LoadingIcon } from "../../assets/svgs";
import styles from "./PageLoader.module.scss";

const PageLoader = () => {
  return (
    <div className={styles.PageLoader}>
      <LoadingIcon />
    </div>
  );
};

export default PageLoader;
