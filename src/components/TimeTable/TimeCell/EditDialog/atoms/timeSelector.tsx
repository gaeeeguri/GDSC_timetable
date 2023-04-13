import { NativeSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";

import { endForm, startForm } from "@/Const/form";

export interface TimeSelectorProps {
  form: UseFormReturnType<any>;
  onStartChange: (e: any) => void;
  onEndChange: (e: any) => void;
}

const TimeSelector = ({
  form,
  onEndChange,
  onStartChange,
}: TimeSelectorProps) => (
  <>
    <NativeSelect
      // defaultValue={times[timeData.start]}
      data={startForm}
      label="시작 시간"
      style={{ width: "45%" }}
      {...form.getInputProps("start")}
      onChange={onStartChange}
    />
    <NativeSelect
      // defaultValue={times[timeData.end]}
      label="종료 시간"
      data={endForm}
      style={{ width: "45%" }}
      {...form.getInputProps("end")}
      onChange={onEndChange}
    />
  </>
);

export default TimeSelector;
