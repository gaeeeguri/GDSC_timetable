import React from "react";
import { TableCell } from "@mui/material";

interface timeTableCellProps {
  day: string;
}

function TimeTableCell({ day }: timeTableCellProps) {
  return (
    <>
      <TableCell align="center"></TableCell>
    </>
  );
}

export default React.memo(TimeTableCell);
