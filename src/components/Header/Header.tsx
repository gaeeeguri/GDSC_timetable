import { createStyles } from "@mantine/core";
import React from "react";

import { AuthMachineContext } from "@/App";
import LoginModalContainer from "@/components/Header/LoginModal/loginModalContainer";
import { removeCookie } from "@/lib/cookie";

import NavBarContainer from "./NavBarContainer/navBarContainer";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    // maxWidth: 1190,
    width: "100vw",
    height: 60,
    zIndex: 6,
    position: "sticky",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    marginLeft: 0,
    marginRight: 0,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
  },
  navWrapper: {
    maxWidth: 1130,
    width: "63vw",
    display: "flex",
  },
  title: {
    ref: getRef("child"),
    maxWidth: 1130,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    display: "flex",
    alignItems: "center",
  },
  form: {},
}));

const Header = () => {
  const [state, send] = AuthMachineContext.useActor();

  const clickLogOut = () => {
    removeCookie("accessToken");
    removeCookie("refreshToken");

    send({
      type: "LOGOUT",
    });
  };

  const clickLogIn = () => send({ type: "OPEN_LOGIN_MODAL" });

  return (
    <>
      <NavBarContainer
        isAdmin={state.matches("authorized")}
        onClickLogIn={clickLogIn}
        onClickLogOut={clickLogOut}
      />
      <LoginModalContainer />
    </>
  );
};

export default Header;
