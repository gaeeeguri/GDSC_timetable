import React from "react";
import styled from "styled-components";
import { types } from "@/Const/types";

interface CalendarBarProps {
  setType: React.Dispatch<React.SetStateAction<string>>;
}

interface TypeBtnProps {
  type: string;
}

const CalendarBarWrapper = styled.div`
  margin-top: 50px;
  margin-left: 70px;
  width: 1400px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`;

const TypeBtnWrapper = styled.button`
  width: fit-content;
  height: fit-content;
`;

function CalendarBar({ setType }: CalendarBarProps) {
  const typesSelectable = types.map((type: string, index: number) => {
    return (
      <TypeBtnWrapper key={index} onClick={() => setType(type)}>
        {type}
      </TypeBtnWrapper>
    );
  });
  return <CalendarBarWrapper>{typesSelectable}</CalendarBarWrapper>;
}

export default CalendarBar;
