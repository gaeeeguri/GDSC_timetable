import { createStyles } from "@mantine/core";
import { createActorContext, useInterpret, useMachine } from "@xstate/react";
import { Context } from "html2canvas/dist/types/core/context";
import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { InterpreterFrom } from "xstate";

import { getCookie } from "@/lib/cookie";

import Header from "./components/Header/Header";
import TimeTable from "./components/TimeTable/TimeTalbe";
import { authMachine } from "./state/authMachine";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    minHeight: "100vh",
  },
}));

export const AuthMachineContext = createActorContext(authMachine);

export default function App() {
  const { classes } = useStyles();

  // const [state, send, actor] = useMachine(authMachine);
  //
  // useEffect(() => {
  //   if (getCookie("accessToken") != undefined) {
  //     send({ type: "ALREADY_AUTHORIZED" });
  //   }
  // }, []);

  return (
    <div className={classes.wrapper}>
      <AuthMachineContext.Provider>
        <Header />
        <TimeTable />
      </AuthMachineContext.Provider>
    </div>
  );
}
