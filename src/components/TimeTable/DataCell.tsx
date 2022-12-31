import { createStyles } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import EditDialog from "@/components/EditDialog/EditDialog";

import { timeBlock } from "../Types/type";

interface cellProps {
  color: string;
  timeData: timeBlock;
  isAdmin: boolean;
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  type: string;
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

      // "&:hover": {
      //   backgroundColor:
      //     theme.colorScheme === "dark"
      //       ? theme.colors[color][4]
      //       : theme.colors[color][6],
      // },
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

  const onDelete = () => {
    setDeleteTry(true);
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
        type={type}
        onClose={onCloseDialog}
        onDelete={onDelete}
      />
    </td>
  );
};

export default DataCell;
