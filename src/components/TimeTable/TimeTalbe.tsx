import { Button, createStyles, Paper, SegmentedControl } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

import captureData from "@/util/saveImage/saveImage";

import { timeBlock } from "../Types/type";
import TimeTableRow from "./timeTableRow";

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
  paperHeader: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calendar: {
    maxHeight: 800,
    maxWidth: 1130,
    marginTop: 15,
    width: "100%",
    borderCollapse: "collapse",
    captionSide: "top",
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[3]}`,
  },
  tableHead: {
    maxWidth: 1130 / 8,
    width: "7vw",
    textAlign: "center",
    padding: "7px 15px",
    fontSize: theme.fontSizes.md,
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[3]}`,
  },
  tableTime: {
    textAlign: "center",
    padding: "12px 15px",
    fontSize: theme.fontSizes.sm,
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[3]}`,
  },
}));

interface timeTableProps {
  isAdmin: boolean;
}

const TimeTable = ({ isAdmin }: timeTableProps) => {
  const { classes } = useStyles();
  const [timeBlock, setTimeBlock] = useState<timeBlock[]>([]);
  const [type, setType] = useState<string>("old");

  const ths = (
    <tr>
      <th className={classes.tableHead}>시간</th>
      <th className={classes.tableHead}>월</th>
      <th className={classes.tableHead}>화</th>
      <th className={classes.tableHead}>수</th>
      <th className={classes.tableHead}>목</th>
      <th className={classes.tableHead}>금</th>
      <th className={classes.tableHead}>토</th>
      <th className={classes.tableHead}>일</th>
    </tr>
  );

  const times: number[] = Array.from({ length: 12 }, (i, j) => j + 12);

  const timeBlockFilter = (time: timeBlock[], num: number) => {
    return time.filter(t => t.start <= num && num < t.end);
  };

  const rows = times.map(time => (
    <tr key={time}>
      <td className={classes.tableTime}>{time > 9 ? time : `0${time}`}:00</td>
      <TimeTableRow
        time={time}
        times={timeBlockFilter(timeBlock, time)}
        isAdmin={isAdmin}
      />
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
        withBorder
        shadow="sm"
        radius="md"
        p="lg"
        className={classes.calendarWrapper}
      >
        <div className={classes.paperHeader}>
          <SegmentedControl
            size="md"
            value={type}
            data={[
              { label: "구관", value: "old" },
              { label: "신관", value: "new" },
            ]}
            onChange={setType}
          />
          <Button
            size="md"
            variant="outline"
            color="gray"
            onClick={captureData}
          >
            시간표 저장
          </Button>
        </div>
        <table id="table" className={classes.calendar}>
          <thead>{ths}</thead>
          <tbody>{rows}</tbody>
        </table>
      </Paper>
    </div>
  );
};

export default TimeTable;
