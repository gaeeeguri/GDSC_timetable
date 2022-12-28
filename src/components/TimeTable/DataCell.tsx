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
  type: boolean;
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

const DataCell = ({
  color,
  timeData,
  isAdmin,
  edit,
  setEdit,
  type,
}: cellProps) => {
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

  useEffect(() => {
    onCloseDialog();
  }, [type]);

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
