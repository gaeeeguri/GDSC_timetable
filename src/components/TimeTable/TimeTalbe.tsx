import { Button, createStyles, Paper, SegmentedControl } from "@mantine/core";
import React, { useEffect, useState } from "react";

import TimeCells from "@/components/TimeTable/timeCells";
import TABLE_CONST from "@/Const/TABLE_CONST";
import FetchTimes from "@/Hook/fetchTimes";
import { AuthMachineContext } from "@/main";
import captureData from "@/util/saveImage/saveImage";

import AddDialog from "../AddDialog/AddDialog";
import { IsDeskTop, timeBlock } from "../Types/type";

const useStyles = createStyles((theme, getRef) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
  },
  calendarWrapper: {
    height: "fit-content",
    maxWidth: 1190,
    [`@media (max-width: 760px)`]: {
      width: "100%",
      marginLeft: 5,
      marginRight: 5,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 10,
    },
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
    [`@media (max-width: 760px)`]: {
      marginTop: 10,
    },
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
    [`@media (max-width: 760px)`]: {
      padding: 0,
    },
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
    maxWidth: 1130 / 8,
    width: "7vw",
    textAlign: "center",
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan("md")]: {
      fontSize: theme.fontSizes.xs,
    },
    [`@media (max-width: 760px)`]: {
      width: "10px",
      padding: 0,
    },
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
    padding: "0",
    margin: "0",
    height: TABLE_CONST.webHeight,
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[3]}`,
  },
  times: {
    textAlign: "center",
    fontSize: theme.fontSizes.sm,
    [theme.fn.smallerThan("md")]: {
      overflow: "hidden",
      fontSize: theme.fontSizes.xs,
      WebkitLineClamp: 1,
      lineClamp: 1,
      WebkitBoxOrient: "vertical",
    },
    [theme.fn.smallerThan("sm")]: {
      fontSize: theme.fontSizes.xs,
    },
    [`@media (max-width: 760px)`]: {
      width: "10px",
      padding: 0,
    },
    border:
      theme.colorScheme === "dark"
        ? `1px solid ${theme.colors.dark[4]}`
        : `1px solid ${theme.colors.gray[3]}`,
    padding: "12px 10px",
    height: TABLE_CONST.webHeight,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
  },
}));

type TimeTableProps = IsDeskTop;
const TimeTable = ({ isDesktop }: TimeTableProps) => {
  const { classes } = useStyles();
  const [type, setType] = useState<string>("old");
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [thisEdit, setThisEdit] = useState<boolean>(false);

  const [state, send] = AuthMachineContext.useActor();

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
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "tue")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "wed")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "thu")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "fri")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "sat")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(newTimeBlock, "sun")}
          type="new"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
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
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "tue")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "wed")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "thu")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "fri")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "sat")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
        />
      </td>
      <td className={classes.emptyCell}>
        <TimeCells
          times={filterByDay(oldTimeBlock, "sun")}
          type="old"
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isAdmin={state.matches("authorized")}
          isDesktop={isDesktop}
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
            size={isDesktop ? "md" : "sm"}
            value={type}
            data={[
              { label: "구관", value: "old" },
              { label: "신관", value: "new" },
            ]}
            onChange={setType}
          />
          {state.matches("authorized") ? (
            <Button size={isDesktop ? "md" : "sm"} onClick={onClickAddButton}>
              연습시간 추가
            </Button>
          ) : (
            <Button
              size={isDesktop ? "md" : "sm"}
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
              <td className={classes.times}>12</td>
              {type === "new" ? newRow : oldRow}
            </tr>
            <tr>
              <td className={classes.times}>1</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>2</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>3</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>4</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>5</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>6</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>7</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>8</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>9</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>10</td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
              <td className={classes.emptyCell}></td>
            </tr>
            <tr>
              <td className={classes.times}>11</td>
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
      <AddDialog
        opened={thisEdit}
        type={type}
        isDesktop={isDesktop}
        onClose={onCloseAddDialog}
      />
    </div>
  );
};

export default TimeTable;
