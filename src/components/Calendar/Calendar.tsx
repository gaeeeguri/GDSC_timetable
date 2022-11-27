import React from "react";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TimeTableRow from "@/components/TimeTableRow/TimeTableRow";

const hourData = Array.from({ length: 15 }, (i, j) => j + 9);

interface CalendarProps {
  type: string;
}

const CalendarWrapper = styled.div`
  width: 1400px;
  min-height: 800px;
  background-color: #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
`;

function Calendar({ type }: CalendarProps) {
  return (
    <CalendarWrapper>
      <TableContainer sx={{ width: "100%", height: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" width={100}>
                시간
              </TableCell>
              <TableCell align="center" width={200}>
                월
              </TableCell>
              <TableCell align="center" width={200}>
                화
              </TableCell>
              <TableCell align="center" width={200}>
                수
              </TableCell>
              <TableCell align="center" width={200}>
                목
              </TableCell>
              <TableCell align="center" width={200}>
                금
              </TableCell>
              <TableCell align="center" width={200}>
                토
              </TableCell>
              <TableCell align="center" width={200}>
                일
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hourData.map((time, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {`${time}:00-${time + 1}:00`}
                </TableCell>
                <TimeTableRow />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CalendarWrapper>
  );
}

export default React.memo(Calendar);
