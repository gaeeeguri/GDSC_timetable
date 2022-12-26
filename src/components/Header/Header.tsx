import { Button, createStyles } from "@mantine/core";
import React from "react";

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
    maxWidth: 1190,
    width: "56vw",
    display: "flex",
  },
  title: {
    ref: getRef("child"),
    maxWidth: 1190,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontSize: theme.fontSizes.lg,
    display: "flex",
    alignItems: "center",
  },
}));

const Header = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.navWrapper}>
        <div className={classes.title}>
          <img src="/public/gdsc-icon.png" alt="" width="24px" height="24px" />
          GDSC Calendar Project
        </div>
        <Button color="red" variant="outline" style={{ marginLeft: "auto" }}>
          관리자 로그인
        </Button>
      </div>
    </div>
  );
};

export default Header;
