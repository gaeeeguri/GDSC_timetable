import { Dispatch, SetStateAction } from "react";

import { timeBlock } from "../Types/type";
import TimeCell from "./TimeCell";

interface TimeCellsProps {
  times: Array<timeBlock>;
  type: "new" | "old";
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
}

const TimeCells = ({
  times,
  type,
  isEdit,
  setIsEdit,
  isAdmin,
}: TimeCellsProps) => {
  return (
    <>
      {times.map(time => (
        <div key={time.id} style={{ width: "100%" }}>
          <TimeCell
            timeData={time}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            type={type}
            isAdmin={isAdmin}
          />
        </div>
      ))}
    </>
  );
};

export default TimeCells;
