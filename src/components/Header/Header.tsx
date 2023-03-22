import React from "react";

import LoginModalContainer from "@/components/Header/LoginModal/loginModalContainer";

import NavBarContainer from "./NavBar/navBarContainer";

const Header = () => {
  return (
    <>
      <NavBarContainer />
      <LoginModalContainer />
    </>
  );
};

export default Header;
