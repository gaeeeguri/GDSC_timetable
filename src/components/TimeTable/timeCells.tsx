import { createStyles } from "@mantine/core";

import colors from "@/Const/colors";

import { timeBlock } from "../Types/type";

interface TimeCellsProps {
  times: Array<timeBlock>;
}

interface BlockProps {
  color: string;
  start: number;
  end: number;
  user: string;
}

const useStyles = createStyles(
  (theme, { color, start, end }: BlockProps, getRef) => ({
    block: {
      width: "8vw",
      maxWidth: 1130 / 8,
      minWidth: 45,
      position: "absolute",
      marginLeft: -1,
      // boxSizing: "border-box",
      borderRight:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.dark[4]}`
          : `1px solid ${theme.colors.gray[3]}`,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors[color][6]
          : theme.colors[color][4],
      marginTop: (start - 12) * 47 - 23,
      height: (end - start) * 47 - 1,
      zIndex: 5,

      color: theme.white,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
    },
  })
);

const Block = ({ color, start, end, user }: BlockProps) => {
  const { classes } = useStyles({ color, start, end, user });
  return <div className={classes.block}>{user}</div>;
};

const TimeCells = ({ times }: TimeCellsProps) => {
  return (
    <>
      {times.map(time => (
        <div key={time.id} style={{ width: "100%" }}>
          <Block
            start={time.start}
            end={time.end}
            user={time.user}
            color={colors[time.user]}
          />
        </div>
      ))}
    </>
  );
};

export default TimeCells;
