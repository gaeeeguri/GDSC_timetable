import { createStyles } from "@mantine/core";
import React from "react";

import Logo from "@/components/Header/NavBar/atoms/logo";

import HeaderButton, { HeaderButtonProps } from "../molecules/headerButton";

const useStyles = createStyles((theme, _params, getRef) => ({
  navWrapper: {
    maxWidth: 1130,
    width: "63vw",
    display: "flex",
  },
}));

export type NavBarProps = HeaderButtonProps;

const NavBar = ({ isAdmin, onClickLogIn, onClickLogOut }: NavBarProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.navWrapper}>
      <Logo />
      <HeaderButton
        isAdmin={isAdmin}
        onClickLogIn={onClickLogIn}
        onClickLogOut={onClickLogOut}
      />
    </div>
  );
};

export default NavBar;
