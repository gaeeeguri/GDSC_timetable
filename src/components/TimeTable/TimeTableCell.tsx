import { useMemo } from "react";
import { timeBlock } from "../Types/type";

interface TimeTableCellProps {
  timeData?: timeBlock | undefined;
  day: string;
  time: number;
}
const TimeTableCell = ({ timeData, day, time }: TimeTableCellProps) => {
  return (
    <>
      {timeData === undefined ? (
        <td></td>
      ) : timeData!.start == time ? (
        <td rowSpan={timeData.end - timeData.start}>{timeData.user}</td>
      ) : timeData!.start < time && time < timeData!.end ? null : (
        <td></td>
      )}
    </>
  );
};

export default TimeTableCell;
