import React from "react";
import "./Header.css";

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="header">
      <div className="titleWrap">
        <h1>{title}</h1>
      </div>
    </div>
  );
};

Header.defaultProps = {
  title: "GDSC Project",
};

export default Header;
