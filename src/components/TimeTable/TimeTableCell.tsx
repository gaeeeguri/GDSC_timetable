import { timeBlock } from "../Types/type";
import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => ({
  cell: {
    color: theme.white,
    backgroundColor: theme.colors.orange[4],
    verticalAlign: "top",
    paddingLeft: 12,
    paddingTop: 12,
  },
  none: {
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[3]}`,
  },
}));

interface TimeTableCellProps {
  timeData?: timeBlock | undefined;
  day: string;
  time: number;
}
const TimeTableCell = ({ timeData, day, time }: TimeTableCellProps) => {
  const { classes } = useStyles();

  return (
    <>
      {timeData === undefined ? (
        <td className={classes.none}></td>
      ) : timeData!.start == time ? (
        <td rowSpan={timeData.end - timeData.start} className={classes.cell}>
          {timeData.user}
        </td>
      ) : timeData!.start < time && time < timeData!.end ? null : (
        <td className={classes.none}></td>
      )}
    </>
  );
};

export default TimeTableCell;
