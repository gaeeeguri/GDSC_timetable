import { SegmentedControl, createStyles, Paper, Table } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

type timeBlock = {
  id: number;
  day: string;
  start: number;
  end: number;
  user: string;
};

type GetTimeBlockResponse = {
  data: timeBlock[];
};

interface TimeTableProps {
  type: string; // old | new
}

const useStyles = createStyles((theme, _params, getRef) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  calendarWrapper: {
    maxHeight: 700,
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
  const [timeBlock, setTimeBlock] = useState<GetTimeBlockResponse>();
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
  async function getTimeBlocks() {
    try {
      const { data, status } = await axios.get<GetTimeBlockResponse>(
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
          verticalSpacing="md"
          fontSize="md"
        >
          <thead>{ths}</thead>
          {type}
        </Table>
      </Paper>
    </div>
  );
};

export default TimeTable;
