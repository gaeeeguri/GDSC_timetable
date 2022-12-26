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
import { IconEdit } from "@tabler/icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import dict from "@/Const/dict";

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

  const onClickEdit = () => {
    setThisEdit(true);
    setEdit(true);
  };

  const onCloseDialog = () => {
    setHover(false);
    setThisEdit(false);
  };

  const checkEdit = (edit: boolean) => {
    console.log("function called");
    if (edit) {
      setThisEdit(false);
      setHover(false);
    }
  };

  return (
    <td
      rowSpan={timeData.end - timeData.start}
      className={classes.cell}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {timeData.user}
      {hover && isAdmin && !thisEdit ? (
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
        opened={thisEdit}
        size="lg"
        radius="md"
        onClose={onCloseDialog}
      >
        <Text size="lg" style={{ marginBottom: 10 }} weight={500}>
          {dict[timeData.day]}요일, {timeData.user} {timeData.start}:00 -{" "}
          {timeData.end}:00
        </Text>
        <Group>
          <NativeSelect
            withAsterisk
            defaultValue={timeData.user}
            data={["도쭈", "휴익", "이그니션", "싱송", "지스리"]}
            label="동아리"
            description="해당 시간에 사용하는 동아리를 골라주세요."
          />
          <NativeSelect
            withAsterisk
            defaultValue={dict[timeData.day]}
            data={["월", "화", "수", "목", "금", "토", "일"]}
            label="요일"
            description="연습할 요일을 정해주세요."
          />
          <NumberInput
            withAsterisk
            defaultValue={timeData.start}
            placeholder="시작 시간"
            label="시작"
          />
          <NumberInput
            withAsterisk
            defaultValue={timeData.end}
            placeholder="종료 시간"
            label="끝"
          />
          <Group position="apart" style={{ width: "100%" }}>
            <Button variant="light" color="red">
              삭제
            </Button>
            <Button variant="light" onClick={onCloseDialog}>
              수정
            </Button>
          </Group>
        </Group>
      </Dialog>
    </td>
  );
};

export default DataCell;
