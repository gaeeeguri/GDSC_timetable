import { timeBlock } from "@/components/Types/type";

import TimeTableCell from "./TimeTableCell";

interface TimeTableRowProps {
  time: number;
  times: timeBlock[];
  isAdmin: boolean;
}

const TimeTableRow = ({ time, times, isAdmin }: TimeTableRowProps) => {
  const dayFilter = (day: string) => {
    return times.find(time => time.day === day);
  };

  return (
    <>
      <TimeTableCell
        day="mon"
        time={time}
        timeData={dayFilter("mon")}
        isAdmin={isAdmin}
      />
      <TimeTableCell
        day="TUE"
        time={time}
        timeData={dayFilter("TUE")}
        isAdmin={isAdmin}
      />
      <TimeTableCell
        day="wed"
        time={time}
        timeData={dayFilter("wed")}
        isAdmin={isAdmin}
      />
      <TimeTableCell
        day="thu"
        time={time}
        timeData={dayFilter("thu")}
        isAdmin={isAdmin}
      />
      <TimeTableCell
        day="fri"
        time={time}
        timeData={dayFilter("fri")}
        isAdmin={isAdmin}
      />
      <TimeTableCell
        day="sat"
        time={time}
        timeData={dayFilter("sat")}
        isAdmin={isAdmin}
      />
      <TimeTableCell
        day="SUN"
        time={time}
        timeData={dayFilter("SUN")}
        isAdmin={isAdmin}
      />
    </>
  );
};

export default TimeTableRow;
