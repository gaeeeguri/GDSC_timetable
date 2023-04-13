import { createStyles } from "@mantine/core";
import React from "react";

const useStyles = createStyles((theme, _params, getRef) => ({
  title: {
    ref: getRef("child"),
    maxWidth: 1130,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    display: "flex",
    alignItems: "center",
  },
}));

const Logo = () => {
  const { classes } = useStyles();

  return <div className={classes.title}>GDSC Calendar Project</div>;
};

export default Logo;
