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
            : theme.colors[color][7]
          : theme.colorScheme === "dark"
          ? theme.colors[color][7]
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
            : theme.colors[color][7],
      },
    },
  })
);

const DataCell = ({ color, timeData, isAdmin, edit, setEdit }: cellProps) => {
  const [thisEdit, setThisEdit] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const { classes } = useStyles({ color, thisEdit, isAdmin });
  const [rangeError, setRangeError] = useState<boolean>(false);

  const form = useForm({
    initialValues: {
      user: timeData.user,
      day: timeData.day,
      start: timeData.start,
      end: timeData.end,
    },

    validate: {
      start: (
        value: number,
        values: { [key: string | number]: string | number }
      ) =>
        value < values.end ? null : "시작 시간은 종료 시간보다 빨라야 합니다!",
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
          style={{ position: "absolute", top: 8, right: 8 }}
          onClick={onClickEdit}
          onKeyDown={() => setEdit(true)}
        >
          <ActionIcon variant="subtle" color={color}>
            <IconEdit size={18} />
          </ActionIcon>
        </div>
      ) : null}
      <Dialog
        withCloseButton
        opened={thisEdit && isAdmin}
        size="lg"
        radius="md"
        onClose={onCloseDialog}
      >
        <Text size="lg" style={{ marginBottom: 10 }} weight={500}>
          {days[timeData.day]}요일, {timeData.user} {timeData.start}:00 -{" "}
          {timeData.end}:00
        </Text>
        <NativeSelect
          defaultValue={timeData.user}
          data={["도쭈", "휴익", "이그니션", "싱송", "지스리"]}
          label="동아리"
          style={{ width: "100%" }}
        />
        <NativeSelect
          defaultValue={days[timeData.day]}
          data={["월", "화", "수", "목", "금", "토", "일"]}
          label="요일"
          style={{ width: "100%", marginTop: 15 }}
        />
        <Group style={{ marginTop: 15 }} position="apart">
          <NativeSelect
            defaultValue={times[timeData.start]}
            data={[
              "정오",
              "1시",
              "2시",
              "3시",
              "4시",
              "5시",
              "6시",
              "7시",
              "8시",
              "9시",
              "10시",
              "11시",
              "자정",
            ]}
            label="시작 시간"
            style={{ width: "45%" }}
          />
          <NativeSelect
            defaultValue={times[timeData.end]}
            label="종료 시간"
            data={[
              "정오",
              "1시",
              "2시",
              "3시",
              "4시",
              "5시",
              "6시",
              "7시",
              "8시",
              "9시",
              "10시",
              "11시",
              "자정",
            ]}
            style={{ width: "45%" }}
          />
        </Group>
        <Group position="apart" style={{ width: "100%", marginTop: 30 }}>
          <Button variant="light" color="red">
            시간 삭제
          </Button>
          <Button variant="light" onClick={onCloseDialog}>
            수정
          </Button>
        </Group>
      </Dialog>
    </td>
  );
};

export default DataCell;
