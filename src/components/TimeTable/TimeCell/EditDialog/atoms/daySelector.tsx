import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";

import { dayForm } from "@/Const/form";

export interface DaySelectorProps {
  form: UseFormReturnType<any>;
}

const DaySelector = ({ form }: DaySelectorProps) => (
  <NativeSelect
    // defaultValue={days[timeData.day]}
    data={dayForm}
    label="요일"
    style={{ width: "100%", marginTop: 15 }}
    {...form.getInputProps("day")}
  />
);

export default DaySelector;
