import { createStyles } from "@mantine/core";

import colors from "@/Const/colors";

import { timeBlock } from "../Types/type";
import TimeCell from "./TimeCell";

interface TimeCellsProps {
  times: Array<timeBlock>;
}

const TimeCells = ({ times }: TimeCellsProps) => {
  return (
    <>
      {times.map(time => (
        <div key={time.id} style={{ width: "100%" }}>
          <TimeCell
            start={time.start}
            end={time.end}
            user={time.user}
            color={colors[time.user]}
          />
        </div>
      ))}
    </>
  );
};

export default TimeCells;
