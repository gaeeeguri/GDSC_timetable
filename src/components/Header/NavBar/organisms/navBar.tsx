import { createStyles } from "@mantine/core";
import React from "react";

import Logo from "@/components/Header/NavBar/atoms/logo";

import HeaderButton, { HeaderButtonProps } from "../molecules/headerButton";

const useStyles = createStyles((theme, _params, getRef) => ({
  navWrapper: {
    maxWidth: 1130,
    width: "63vw",
    [`@media (max-width: 760px)`]: {
      width: "100%",
    },

    display: "flex",
  },
}));

export type NavBarProps = HeaderButtonProps;

const NavBar = ({
  isAdmin,
  onClickLogIn,
  onClickLogOut,
  isDesktop,
}: NavBarProps) => {
  const { classes } = useStyles();

  return (
    <div className={classes.navWrapper}>
      <Logo isDesktop={isDesktop} />
      <HeaderButton
        isAdmin={isAdmin}
        isDesktop={isDesktop}
        onClickLogIn={onClickLogIn}
        onClickLogOut={onClickLogOut}
      />
    </div>
  );
};

export default NavBar;
