import { Dispatch, SetStateAction } from "react";

import { timeBlock } from "@/components/Types/type";

import TimeTableCell from "./TimeTableCell";

interface TimeTableRowProps {
  time: number;
  times: timeBlock[];
  isAdmin: boolean;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  type: string;
}

const TimeTableRow = ({
  time,
  times,
  isAdmin,
  edit,
  setEdit,
  type,
}: TimeTableRowProps) => {
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
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
      <TimeTableCell
        day="tue"
        time={time}
        timeData={dayFilter("tue")}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
      <TimeTableCell
        day="wed"
        time={time}
        timeData={dayFilter("wed")}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
      <TimeTableCell
        day="thu"
        time={time}
        timeData={dayFilter("thu")}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
      <TimeTableCell
        day="fri"
        time={time}
        timeData={dayFilter("fri")}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
      <TimeTableCell
        day="sat"
        time={time}
        timeData={dayFilter("sat")}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
      <TimeTableCell
        day="sun"
        time={time}
        timeData={dayFilter("sun")}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
    </>
  );
};

export default TimeTableRow;
