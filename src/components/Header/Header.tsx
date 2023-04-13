import React from "react";

import LoginModalContainer from "@/components/Header/LoginModal/loginModalContainer";

import NavBarContainer, {
  NavBarContainerProps,
} from "./NavBar/navBarContainer";

type HeaderProps = NavBarContainerProps;
const Header = ({ isDesktop }: HeaderProps) => {
  return (
    <>
      <NavBarContainer isDesktop={isDesktop} />
      <LoginModalContainer />
    </>
  );
};

export default Header;
