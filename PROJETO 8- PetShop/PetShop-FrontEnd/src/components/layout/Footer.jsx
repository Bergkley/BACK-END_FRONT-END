import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className={styles.bold}>Get A Pet</span> &copy; 2024
      </p>
    </footer>
  );
};

export default Footer;
