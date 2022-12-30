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
      position: "absolute",
      top: "auto",
      left: "auto",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors[color][6]
          : theme.colors[color][4],
      marginTop: (start - 12) * 47,
      height: (end - start) * 47,
      zIndex: 5,
    },
  })
);

const Block = ({ color, start, end, user }: BlockProps) => {
  const { classes } = useStyles({ color, start, end, user });
  return (
    <div className={classes.block}>
      {user} {start}
    </div>
  );
};

const TimeCells = ({ times }: TimeCellsProps) => {
  return (
    <>
      {times.map(time => (
        <div key={time.id} style={{ width: "8vw", margin: "0 auto" }}>
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
