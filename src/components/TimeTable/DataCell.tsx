import {
  ActionIcon,
  Button,
  createStyles,
  Dialog,
  Group,
  NativeSelect,
  NumberInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconEdit } from "@tabler/icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import EditDialog from "@/components/EditDialog/EditDialog";
import days from "@/Const/days";
import times from "@/Const/times";

import { timeBlock } from "../Types/type";

interface cellProps {
  color: string;
  timeData: timeBlock;
  isAdmin: boolean;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
}

interface styleProps {
  color: string;
  thisEdit: boolean;
  isAdmin: boolean;
}

const useStyles = createStyles(
  (theme, { color, thisEdit, isAdmin }: styleProps, getRef) => ({
    cell: {
      color: theme.white,
      backgroundColor:
        thisEdit && isAdmin
          ? theme.colorScheme === "dark"
            ? theme.colors[color][4]
            : theme.colors[color][6]
          : theme.colorScheme === "dark"
          ? theme.colors[color][6]
          : theme.colors[color][4],
      verticalAlign: "top",
      paddingLeft: 10,
      paddingTop: 10,
      position: "relative",
      border:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.dark[4]}`
          : `1px solid ${theme.colors.gray[3]}`,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors[color][4]
            : theme.colors[color][6],
      },
    },
    editButton: {
      color: theme.white,
      width: 25,
      height: 25,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 6,

      "&:hover": {
        cursor: "pointer",
        backgroundColor: theme.white,
        color:
          theme.colorScheme === "dark"
            ? theme.colors[color][4]
            : theme.colors[color][6],
      },
    },
  })
);

const DataCell = ({ color, timeData, isAdmin, edit, setEdit }: cellProps) => {
  const [thisEdit, setThisEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const [deleteTry, setDeleteTry] = useState<boolean>(false);
  const { classes } = useStyles({ color, thisEdit, isAdmin });

  const form = useForm({
    initialValues: {
      id: timeData.id,
      user: timeData.user,
      day: timeData.day,
      start: timeData.start,
      end: timeData.end,
    },

    validate: {
      end: (
        value: number,
        values: { [key: string | number]: string | number }
      ) =>
        values.start < value
          ? null
          : "종료 시간은 시작 시간보다 늦어야 합니다!",
    },
  });

  const onClickEdit = () => {
    setThisEdit(true);
    setEdit(true);
  };

  const onCloseDialog = () => {
    setHover(false);
    setThisEdit(false);
    setEdit(false);
    setDeleteTry(false);
  };

  const onSubmit = (values: { [key: string | number]: string | number }) => {
    console.log(values);
  };

  const onDelete = () => {
    deleteTry ? console.log("delete!") : setDeleteTry(true);
  };

  useEffect(() => {
    if (!isAdmin) {
      setThisEdit(false);
      setEdit(false);
      setHover(false);
    }
  }, [isAdmin]);

  return (
    <td
      rowSpan={timeData.end - timeData.start}
      className={classes.cell}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {timeData.user}
      {hover && isAdmin && !thisEdit && !edit ? (
        <div
          role="presentation"
          style={{ position: "absolute", top: 10, right: 10 }}
          onClick={onClickEdit}
          onKeyDown={() => setEdit(true)}
        >
          <div className={classes.editButton}>
            <IconEdit size={18} />
          </div>
        </div>
      ) : null}
      {/*<Dialogs*/}
      {/*  withCloseButton*/}
      {/*  opened={thisEdit && isAdmin}*/}
      {/*  size="lg"*/}
      {/*  radius="md"*/}
      {/*  onClose={onCloseDialog}*/}
      {/*>*/}
      {/*  <Text size="lg" style={{ marginBottom: 10 }} weight={500}>*/}
      {/*    {days[timeData.day]}요일, {timeData.user} {timeData.start}:00 -{" "}*/}
      {/*    {timeData.end}:00*/}
      {/*  </Text>*/}
      {/*  <form onSubmit={form.onSubmit(values => onSubmit(values))}>*/}
      {/*    <NativeSelect*/}
      {/*      defaultValue={timeData.user}*/}
      {/*      data={["도쭈", "휴익", "이그니션", "싱송", "지스리"]}*/}
      {/*      label="동아리"*/}
      {/*      style={{ width: "100%" }}*/}
      {/*      {...form.getInputProps("user")}*/}
      {/*    />*/}
      {/*    <NativeSelect*/}
      {/*      defaultValue={days[timeData.day]}*/}
      {/*      data={[*/}
      {/*        { value: "mon", label: "월" },*/}
      {/*        { value: "tue", label: "화" },*/}
      {/*        { value: "wed", label: "수" },*/}
      {/*        { value: "thu", label: "목" },*/}
      {/*        { value: "fri", label: "금" },*/}
      {/*        { value: "sat", label: "토" },*/}
      {/*        { value: "sun", label: "일" },*/}
      {/*      ]}*/}
      {/*      label="요일"*/}
      {/*      style={{ width: "100%", marginTop: 15 }}*/}
      {/*      {...form.getInputProps("day")}*/}
      {/*    />*/}
      {/*    <Group style={{ marginTop: 15 }} position="apart">*/}
      {/*      <NativeSelect*/}
      {/*        defaultValue={times[timeData.start]}*/}
      {/*        data={[*/}
      {/*          { value: 12, label: "정오" },*/}
      {/*          { value: 13, label: "1시" },*/}
      {/*          { value: 14, label: "2시" },*/}
      {/*          { value: 15, label: "3시" },*/}
      {/*          { value: 16, label: "4시" },*/}
      {/*          { value: 17, label: "5시" },*/}
      {/*          { value: 18, label: "6시" },*/}
      {/*          { value: 19, label: "7시" },*/}
      {/*          { value: 20, label: "8시" },*/}
      {/*          { value: 21, label: "9시" },*/}
      {/*          { value: 22, label: "10시" },*/}
      {/*          { value: 23, label: "11시" },*/}
      {/*        ]}*/}
      {/*        label="시작 시간"*/}
      {/*        style={{ width: "45%" }}*/}
      {/*        {...form.getInputProps("start")}*/}
      {/*      />*/}
      {/*      <NativeSelect*/}
      {/*        defaultValue={times[timeData.end]}*/}
      {/*        label="종료 시간"*/}
      {/*        data={[*/}
      {/*          { value: 13, label: "1시" },*/}
      {/*          { value: 14, label: "2시" },*/}
      {/*          { value: 15, label: "3시" },*/}
      {/*          { value: 16, label: "4시" },*/}
      {/*          { value: 17, label: "5시" },*/}
      {/*          { value: 18, label: "6시" },*/}
      {/*          { value: 19, label: "7시" },*/}
      {/*          { value: 20, label: "8시" },*/}
      {/*          { value: 21, label: "9시" },*/}
      {/*          { value: 22, label: "10시" },*/}
      {/*          { value: 23, label: "11시" },*/}
      {/*          { value: 24, label: "자정" },*/}
      {/*        ]}*/}
      {/*        style={{ width: "45%" }}*/}
      {/*        {...form.getInputProps("end")}*/}
      {/*      />*/}
      {/*    </Group>*/}
      {/*    <Group position="apart" style={{ width: "100%", marginTop: 30 }}>*/}
      {/*      <Group position="left" spacing={5}>*/}
      {/*        <Button*/}
      {/*          variant={deleteTry ? "filled" : "light"}*/}
      {/*          color="red"*/}
      {/*          onClick={onDelete}*/}
      {/*        >*/}
      {/*          시간 삭제*/}
      {/*        </Button>*/}
      {/*        {deleteTry ? (*/}
      {/*          <Text size="xs" color="red">*/}
      {/*            한번 더 눌러 삭제하기*/}
      {/*          </Text>*/}
      {/*        ) : null}*/}
      {/*      </Group>*/}
      {/*      <Button variant="light" type="submit" onClick={onCloseDialog}>*/}
      {/*        수정*/}
      {/*      </Button>*/}
      {/*    </Group>*/}
      {/*  </form>*/}
      {/*</Dialogs>*/}
      <EditDialog
        opened={thisEdit && isAdmin}
        timeData={timeData}
        deleteTry={deleteTry}
        onClose={onCloseDialog}
        onDelete={onDelete}
      />
    </td>
  );
};

export default DataCell;
