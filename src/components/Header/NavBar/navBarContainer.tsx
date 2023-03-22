import { createStyles } from "@mantine/core";
import React from "react";

import { AuthMachineContext } from "@/App";
import NavBar from "@/components/Header/NavBar/organisms/navBar";
import { removeCookie } from "@/lib/cookie";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
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
}));
const NavBarContainer = () => {
  const { classes } = useStyles();

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
    <div className={classes.wrapper}>
      <NavBar
        isAdmin={state.matches("authorized")}
        onClickLogOut={clickLogOut}
        onClickLogIn={clickLogIn}
      />
    </div>
  );
};

export default NavBarContainer;
