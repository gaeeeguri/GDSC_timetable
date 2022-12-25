import { timeBlock } from "@/components/Types/type";

import TimeTableCell from "./TimeTableCell";

interface TimeTableRowProps {
  time: number;
  times: timeBlock[];
}

const TimeTableRow = ({ time, times }: TimeTableRowProps) => {
  const dayFilter = (day: string) => {
    return times.find(time => time.day === day);
  };

  return (
    <>
      <TimeTableCell day="mon" time={time} timeData={dayFilter("mon")} />
      <TimeTableCell day="TUE" time={time} timeData={dayFilter("TUE")} />
      <TimeTableCell day="wed" time={time} timeData={dayFilter("wed")} />
      <TimeTableCell day="thu" time={time} timeData={dayFilter("thu")} />
      <TimeTableCell day="fri" time={time} timeData={dayFilter("fri")} />
      <TimeTableCell day="sat" time={time} timeData={dayFilter("sat")} />
      <TimeTableCell day="sun" time={time} timeData={dayFilter("sun")} />
    </>
  );
};

export default TimeTableRow;
