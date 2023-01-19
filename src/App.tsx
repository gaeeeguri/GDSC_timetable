import { createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Header from "./components/Header/Header";
import TimeTable from "./components/TimeTable/TimeTalbe";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    minHeight: "100vh",
  },
}));

export default function App() {
  const { classes } = useStyles();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "refreshToken",
  ]);

  useEffect(() => {
    if (cookies.accessToken != null) {
      setIsAdmin(true);
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <TimeTable isAdmin={isAdmin} />
    </div>
  );
}
