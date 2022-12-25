import { SegmentedControl, createStyles, Paper, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";
import TimeTableRow from "./timeTableRow";
import { timeBlock } from "../Types/type";

interface TimeTableProps {
  type: string; // old | new
}

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  calendarWrapper: {
    height: "fit-content",
    maxWidth: 1130,
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
    justifyContent: "flex-start",
    marginTop: 30,
  },
  calendar: {
    maxHeight: 1400,
    maxWidth: 800,
    marginTop: 15,
  },
}));

const TimeTable = () => {
  const { classes } = useStyles();
  const [timeBlock, setTimeBlock] = useState<timeBlock[]>([]);
  const [type, setType] = useState<string>("old");

  const ths = (
    <tr>
      <th>시간</th>
      <th>월</th>
      <th>화</th>
      <th>수</th>
      <th>목</th>
      <th>금</th>
      <th>토</th>
      <th>일</th>
    </tr>
  );

  const times: number[] = Array.from({ length: 12 }, (i, j) => j + 12);

  const timeBlockFilter = (time: timeBlock[], num: number) => {
    return time.filter(t => t.start <= num && num < t.end);
  };

  const rows = times.map(time => (
    <tr key={time}>
      <td>{time > 9 ? time : `0${time}`}:00</td>
      <TimeTableRow time={time} times={timeBlockFilter(timeBlock, time)} />
    </tr>
  ));

  async function getTimeBlocks() {
    try {
      const { data, status } = await axios.get<timeBlock[]>(
        "http://35.247.70.187:8080/demo/alltime",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);

      setTimeBlock(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred.";
      }
    }
  }

  useEffect(() => {
    getTimeBlocks();
  }, []);

  return (
    <div className={classes.wrapper}>
      <Paper
        shadow="sm"
        radius="md"
        p="lg"
        className={classes.calendarWrapper}
        withBorder
      >
        <SegmentedControl
          size="md"
          value={type}
          onChange={setType}
          data={[
            { label: "구관", value: "old" },
            { label: "신관", value: "new" },
          ]}
        />
        <Table
          className={classes.calendar}
          withColumnBorders
          withBorder
          horizontalSpacing="xl"
          verticalSpacing="xs"
          fontSize="sm"
        >
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default TimeTable;
