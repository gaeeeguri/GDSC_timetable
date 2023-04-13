import { createStyles } from "@mantine/core";
import React from "react";

import GdscLogo from "@/components/Header/NavBar/atoms/gdscLogo";

const useStyles = createStyles((theme, _params, getRef) => ({
  title: {
    ref: getRef("child"),
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    display: "flex",
    alignItems: "center",
  },
}));

export interface LogoProps {
  isDesktop: boolean;
}

const Logo = ({ isDesktop }: LogoProps) => {
  const { classes } = useStyles();

  return isDesktop ? (
    <div className={classes.title}>GDSC Calendar Project</div>
  ) : (
    <GdscLogo />
  );
};

export default Logo;
