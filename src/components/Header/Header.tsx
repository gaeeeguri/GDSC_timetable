import React from "react";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    // maxWidth: 1190,
    width: "100vw",
    height: 60,
    zIndex: 6,
    position: "sticky",
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
  title: {
    ref: getRef("child"),
    maxWidth: 1190,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
  },
}));

const Header = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>GDSC Calendar Project</div>
    </div>
  );
};

export default Header;
