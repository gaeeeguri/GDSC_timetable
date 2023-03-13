import { createStyles } from "@mantine/core";
import { createActorContext } from "@xstate/react";

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

  return (
    <div className={classes.wrapper}>
      <AuthMachineContext.Provider>
        <Header />
        <TimeTable />
      </AuthMachineContext.Provider>
    </div>
  );
}
