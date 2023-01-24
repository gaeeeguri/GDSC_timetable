import { createStyles } from "@mantine/core";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { getCookie } from "@/lib/cookie";

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

  useEffect(() => {
    if (getCookie("accessToken") != undefined) {
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
