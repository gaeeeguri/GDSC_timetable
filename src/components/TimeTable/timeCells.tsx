import { timeBlock } from "../Types/type";
import TimeCell, { CellProps } from "./TimeCell/TimeCell";

interface TimeCellsProps extends CellProps {
  times: timeBlock[];
}

const TimeCells = ({
  times,
  type,
  isEdit,
  setIsEdit,
  isAdmin,
  isDesktop,
}: TimeCellsProps) => {
  return (
    <>
      {times.map(time => (
        <div
          key={time.id}
          style={{
            width: "100%",
            position: "relative",
            padding: "0",
            margin: "0",
          }}
        >
          <TimeCell
            timeData={time}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            type={type}
            isAdmin={isAdmin}
            isDesktop={isDesktop}
          />
        </div>
      ))}
    </>
  );
};

export default TimeCells;
