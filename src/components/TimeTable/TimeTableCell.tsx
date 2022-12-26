import { createStyles } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

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
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}
const TimeTableCell = ({
  timeData,
  day,
  time,
  isAdmin,
  edit,
  setEdit,
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
          timeData={timeData}
          isAdmin={isAdmin}
          edit={edit}
          setEdit={setEdit}
        />
      ) : timeData!.start < time && time < timeData!.end ? null : (
        <td className={classes.none}></td>
      )}
    </>
  );
};

export default TimeTableCell;
