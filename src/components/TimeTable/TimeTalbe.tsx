import { Button, createStyles, Paper, SegmentedControl } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

import captureData from "@/util/saveImage/saveImage";

import AddDialog from "../AddDialog/AddDialog";
import { timeBlock } from "../Types/type";
import TimeTableRow from "./timeTableRow";

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
    backgroundColor: theme.colorScheme === "dark" ? theme.black : theme.white,
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
  const [oldTimeBlock, setOldTimeBlock] = useState<timeBlock[]>([]);
  const [newTimeBlock, setNewTimeBlock] = useState<timeBlock[]>([]);
  const [type, setType] = useState<string>("old");
  const [edit, setEdit] = useState<boolean>(false);
  const [thisEdit, setThisEdit] = useState<boolean>(false);

  const onAdd = () => {
    setThisEdit(true);
    setEdit(true);
  };

  const onClose = () => {
    setThisEdit(false);
    setEdit(false);
  };

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

  const oldRows = times.map(time => (
    <tr key={time}>
      <td className={classes.tableTime}>
        오후 {time < 13 ? time : time - 12}시
      </td>
      <TimeTableRow
        time={time}
        times={timeBlockFilter(oldTimeBlock, time)}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
      />
    </tr>
  ));

  const newRows = times.map(time => (
    <tr key={time}>
      <td className={classes.tableTime}>{time > 9 ? time : `0${time}`}:00</td>
      <TimeTableRow
        time={time}
        times={timeBlockFilter(newTimeBlock, time)}
        isAdmin={isAdmin}
        edit={edit}
        setEdit={setEdit}
        type={type}
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

      setOldTimeBlock(data);
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

  const demoDataSet = () => {
    setOldTimeBlock([
      {
        id: 1,
        day: "mon",
        start: 22,
        end: 24,
        user: "도쭈",
      },
      {
        id: 2,
        day: "mon",
        start: 19,
        end: 20,
        user: "휴익",
      },
      {
        id: 3,
        day: "tue",
        start: 19,
        end: 23,
        user: "지스리",
      },
      {
        id: 4,
        day: "wed",
        start: 14,
        end: 17,
        user: "도쭈",
      },
      {
        id: 5,
        day: "fri",
        start: 20,
        end: 21,
        user: "이그니션",
      },
      {
        id: 6,
        day: "fri",
        start: 21,
        end: 24,
        user: "싱송",
      },
    ]);
    setNewTimeBlock([
      {
        id: 7,
        day: "mon",
        start: 20,
        end: 23,
        user: "싱송",
      },
      {
        id: 8,
        day: "tue",
        start: 19,
        end: 20,
        user: "지스리",
      },
      {
        id: 9,
        day: "tue",
        start: 20,
        end: 23,
        user: "싱송",
      },
      {
        id: 10,
        day: "fri",
        start: 18,
        end: 21,
        user: "도쭈",
      },
      {
        id: 11,
        day: "fri",
        start: 21,
        end: 24,
        user: "이그니션",
      },
      {
        id: 12,
        day: "sat",
        start: 21,
        end: 24,
        user: "싱송",
      },
    ]);
  };

  useEffect(() => {
    // getTimeBlocks();
    demoDataSet();
  }, []);

  useEffect(() => {
    onClose();
  }, [type]);

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
          {isAdmin ? (
            <Button size="md" onClick={onAdd}>
              연습시간 추가
            </Button>
          ) : (
            <Button
              size="md"
              variant="outline"
              color="gray"
              onClick={captureData}
            >
              이미지로 저장
            </Button>
          )}
        </div>
        <table id="table" className={classes.calendar}>
          <thead>{ths}</thead>
          <tbody>{type === "old" ? oldRows : newRows}</tbody>
        </table>
      </Paper>
      <AddDialog opened={thisEdit} onClose={onClose} />
    </div>
  );
};

export default TimeTable;
