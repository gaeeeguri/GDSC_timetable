import { createStyles } from "@mantine/core";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { getCookie } from "@/lib/cookie";

import Header from "./components/Header/Header";
import TimeTable from "./components/TimeTable/TimeTalbe";
import { authMachine } from "./state/authMachine";
import { useInterpret, useMachine } from "@xstate/react";
import { Context } from "html2canvas/dist/types/core/context";
import { InterpreterFrom } from "xstate";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    minHeight: "100vh",
  },
}));

export const AuthAactorContext = createContext({});

export default function App() {
  const { classes } = useStyles();

  const authActor = useInterpret(authMachine);

  const [state, send, actor] = useMachine(authMachine);

  useEffect(() => {
    if (getCookie("accessToken") != undefined) {
      send({ type: "ALREADY_AUTHORIZED" });
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <AuthAactorContext.Provider value={{ authActor }}>
        <Header />
        <TimeTable />
      </AuthAactorContext.Provider>
    </div>
  );
}
