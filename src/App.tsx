import { createStyles } from "@mantine/core";
import { useState } from "react";

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
  return (
    <div className={classes.wrapper}>
      <Header isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      <TimeTable />
    </div>
  );
}
