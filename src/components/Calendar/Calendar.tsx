import React from "react";
import styled from "styled-components";

interface CalendarProps {
  type: string;
}

const CalendarWrapper = styled.div`
  width: 1400px;
  height: 800px;
  background-color: #000000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5em;
`;

function Calendar({ type }: CalendarProps) {
  return (
    <CalendarWrapper>
      <div>{type}</div>
    </CalendarWrapper>
  );
}

export default Calendar;
