import { Text } from "@mantine/core";
import React from "react";

import days from "@/Const/days";

export interface EditDialogTitleProps {
  user: string;
  day: string;
  start: number;
  end: number;
}

const EditDialogTitle = ({ user, day, start, end }: EditDialogTitleProps) => {
  const getStart = (start: number) => (start === 12 ? 12 : start - 12);

  return (
    <Text size="lg" style={{ marginBottom: 10 }} weight={500}>
      {user}, {days[day]}요일 오후 &nbsp;
      {getStart(start)}시 ~ {end - 12}시
    </Text>
  );
};

export default EditDialogTitle;
