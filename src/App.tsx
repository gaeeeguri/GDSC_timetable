import { createStyles } from "@mantine/core";
import { useEffect } from "react";

import { getCookie } from "@/lib/cookie";
import { AuthMachineContext } from "@/main";

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
  //TODO: authorized on refresh
  const [state, send] = AuthMachineContext.useActor();

  useEffect(() => {
    if (
      getCookie("accessToken") != undefined &&
      state.matches("unauthorized")
    ) {
      send({ type: "ALREADY_AUTHORIZED" });
    }
  }, [send, state]);

  return (
    <div className={classes.wrapper}>
      <Header />
      <TimeTable />
    </div>
  );
}
