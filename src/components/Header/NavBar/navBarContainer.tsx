import { createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React from "react";

import NavBar from "@/components/Header/NavBar/organisms/navBar";
import { removeCookie } from "@/lib/cookie";
import { AuthMachineContext } from "@/main";

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
    [`@media (max-width: 760px)`]: {
      paddingLeft: 30 + 20,
      paddingRight: 30 + 20,
    },

    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[2]
    }`,
  },
}));
const NavBarContainer = () => {
  const { classes } = useStyles();

  const [state, send] = AuthMachineContext.useActor();

  const isDesktop: boolean = useMediaQuery("(min-width: 760px)");

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
        isDesktop={isDesktop}
        onClickLogOut={clickLogOut}
        onClickLogIn={clickLogIn}
      />
    </div>
  );
};

export default NavBarContainer;
