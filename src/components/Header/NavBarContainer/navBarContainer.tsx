import { createStyles } from "@mantine/core";
import React from "react";

import NavBar, {
  NavBarProps,
} from "@/components/Header/NavBarContainer/organisms/navBar";

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
const NavBarContainer = ({ logOut, logIn, isAdmin }: NavBarProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <NavBar logOut={logOut} logIn={logIn} isAdmin={isAdmin} />
    </div>
  );
};

export default NavBarContainer;
