import React from "react";
import TimeTableCell from "@/components/TableCell/TableCell";

function TimeTableRow({ ...props }) {
  return (
    <>
      <TimeTableCell day="mon" {...props} />
      <TimeTableCell day="tue" {...props} />
      <TimeTableCell day="wed" {...props} />
      <TimeTableCell day="thu" {...props} />
      <TimeTableCell day="fri" {...props} />
      <TimeTableCell day="sat" {...props} />
      <TimeTableCell day="sun" {...props} />
    </>
  );
}

export default React.memo(TimeTableRow);
