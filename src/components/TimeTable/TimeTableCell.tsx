import { createStyles } from "@mantine/core";

import DataCell from "@/components/TimeTable/DataCell";

import { timeBlock } from "../Types/type";

const colors: { [key: string]: string } = {
  도쭈: "violet",
  휴익: "grape",
  이그니션: "indigo",
  싱송: "teal",
  지스리: "orange",
};

const useStyles = createStyles((theme, _, getRef) => ({
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
  isAdmin: boolean;
}
const TimeTableCell = ({
  timeData,
  day,
  time,
  isAdmin,
}: TimeTableCellProps) => {
  const color = timeData ? colors[timeData.user] : "";
  const { classes } = useStyles();

  return (
    <>
      {timeData === undefined ? (
        <td className={classes.none}></td>
      ) : timeData!.start == time ? (
        <DataCell
          color={colors[timeData.user] ? colors[timeData.user] : "blue"}
          rowSpan={timeData.end - timeData.start}
          user={timeData.user}
          isAdmin={isAdmin}
        />
      ) : timeData!.start < time && time < timeData!.end ? null : (
        <td className={classes.none}></td>
      )}
    </>
  );
};

export default TimeTableCell;
