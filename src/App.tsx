import { createStyles } from "@mantine/core";
import Header from "./components/Header/Header";
import TimeTable from "./components/TimeTable/TimeTalbe";

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },
}));

export default function App() {
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <Header />
      <TimeTable />
    </div>
  );
}
