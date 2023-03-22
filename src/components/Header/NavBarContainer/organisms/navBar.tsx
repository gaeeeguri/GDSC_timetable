import { createStyles } from "@mantine/core";
import React from "react";

import Logo from "@/components/Header/NavBarContainer/atoms/logo";

import HeaderButton, { HeaderButtonProps } from "../molecules/headerButton";

const useStyles = createStyles((theme, _params, getRef) => ({
  navWrapper: {
    maxWidth: 1130,
    width: "63vw",
    display: "flex",
  },
}));

export type NavBarProps = HeaderButtonProps;

const NavBar = ({ isAdmin, logIn, logOut }: NavBarProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.navWrapper}>
      <Logo />
      <HeaderButton isAdmin={isAdmin} logIn={logIn} logOut={logOut} />
    </div>
  );
};

export default NavBar;
