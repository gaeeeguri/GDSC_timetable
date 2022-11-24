import React from "react";
import styles from "./Header.module.css";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleWrap}>
        <h1>{title}</h1>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: "GDSC Project",
};

export default Header;
