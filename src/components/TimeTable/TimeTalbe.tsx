import { Button, createStyles, Paper, SegmentedControl } from "@mantine/core";
import React, { useEffect, useState } from "react";

import TimeCells from "@/components/TimeTable/timeCells";
import TABLE_CONST from "@/Const/TABLE_CONST";
import FetchTimes from "@/Hook/fetchTimes";
import captureData from "@/util/saveImage/saveImage";

import AddDialog from "../AddDialog/AddDialog";
import { timeBlock } from "../Types/type";
import { useMachine } from "@xstate/react";
import { authMachine } from "@/state/authMachine";

interface tableLengthProps {
  height: number;
}

const useStyles = createStyles(
  (theme, { height }: tableLengthProps, getRef) => ({
    wrapper: {
      display: "flex",
      justifyContent: "center",
    },
    calendarWrapper: {
      height: "fit-content",
      maxWidth: 1190,
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
      width: "8vw",
      minWidth: 45,
      textAlign: "center",
      padding: "7px 15px",
      fontSize: theme.fontSizes.sm,
      border:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.dark[4]}`
          : `1px solid ${theme.colors.gray[3]}`,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
    },
    timesHead: {
      minWidth: 92,
      maxWidth: 1130 / 8,
      width: "7vw",
      textAlign: "center",
      fontSize: theme.fontSizes.sm,
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
    emptyCell: {
      width: "8vw",
      height: height,
      border:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.dark[4]}`
          : `1px solid ${theme.colors.gray[3]}`,
    },
    times: {
      textAlign: "center",
      fontSize: theme.fontSizes.sm,
      border:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.dark[4]}`
          : `1px solid ${theme.colors.gray[3]}`,
      padding: "12px 10px",
      height: height,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
    },
  })
);

const TimeTable = () => {
  const { classes } = useStyles({ height: TABLE_CONST.height });
  const [type, setType] = useState<string>("old");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [thisEdit, setThisEdit] = useState<boolean>(false);

  const [state, send, actor] = useMachine(authMachine);

  const newTimeBlock: Array<timeBlock> = FetchTimes("new", isEdit);
  const oldTimeBlock: Array<timeBlock> = FetchTimes("old", isEdit);

  const filterByDay = (
    times: Array<timeBlock>,
    day: string
  ): Array<timeBlock> => {
    return times.filter(time => time.day === day);
  };

  const newRow = (
    <>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "mon")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "tue")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "wed")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "thu")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "fri")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "sat")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "sun")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
    </>
  );

  const oldRow = (
    <>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "mon")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "tue")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "wed")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "thu")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "fri")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "sat")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "sun")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
        />
      </td>
    </>
  );

  const onClickAddButton = () => {
    setThisEdit(true);
    setIsEdit(true);
  };

  const onCloseAddDialog = () => {
    setIsEdit(false);
    setThisEdit(false);
  };

  useEffect(() => {
    onCloseAddDialog();
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
          {state.matches("authorized") ? (
            <Button size="md" onClick={onClickAddButton}>
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
          <thead>
            <tr>
              <td className={classes.timesHead}></td>
              <td className={classes.tableHead}>월</td>
              <td className={classes.tableHead}>화</td>
              <td className={classes.tableHead}>수</td>
              <td className={classes.tableHead}>목</td>
              <td className={classes.tableHead}>금</td>
              <td className={classes.tableHead}>토</td>
              <td className={classes.tableHead}>일</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={classes.times}>오후 12시</td>
              {type === "new" ? newRow : oldRow}
            </tr>
            <tr>
              <td className={classes.times}>오후 1시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 2시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 3시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 4시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 5시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 6시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 7시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 8시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 9시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 10시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>오후 11시</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
          </tbody>
        </table>
      </Paper>
      <AddDialog opened={thisEdit} type={type} onClose={onCloseAddDialog} />
    </div>
  );
};

export default TimeTable;
