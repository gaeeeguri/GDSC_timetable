import { createStyles } from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";

import EditButton from "@/components/TimeTable/TimeCell/atoms/editButton";
import colors from "@/Const/colors";
import TABLE_CONST from "@/Const/TABLE_CONST";

import { timeBlock } from "../../Types/type";
import EditDialog from "./EditDialog/EditDialog";

interface BlockProps {
  start: number;
  end: number;
  color: string;
}

const useStyles = createStyles(
  (theme, { start, end, color }: BlockProps, getRef) => ({
    block: {
      width: "100%",
      [`@media (max-width: ${theme.breakpoints.sm})`]: {
        width: "calc((100vw - 35px * 2) / 8)",
      },
      position: "absolute",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors[color][6]
          : theme.colors[color][4],
      marginTop: (start - 12) * TABLE_CONST.height - 23,
      height: (end - start) * TABLE_CONST.height - 1,
      zIndex: 5,

      color: theme.white,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
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

interface TimeCellProps {
  timeData: timeBlock;
  type: "new" | "old";
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
}

const TimeCell = ({
  timeData,
  type,
  isEdit,
  setIsEdit,
  isAdmin,
}: TimeCellProps) => {
  const [start, end, color] = [
    timeData.start,
    timeData.end,
    colors[timeData.user],
  ];
  const { classes } = useStyles({ start, end, color });
  const [hover, setHover] = useState<boolean>(false);
  const [isDialogOn, setIsDialogOn] = useState<boolean>(false);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const onClickEditIcon = () => {
    setIsDialogOn(true);
    setIsEdit(true);
  };

  const onCloseEditModal = () => {
    setIsDialogOn(false);
    setIsEdit(false);
  };

  return (
    <>
      <div
        className={classes.block}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {timeData.user}

        <EditButton
          isVisible={hover && !isEdit && isAdmin}
          color={color}
          onClickEdit={onClickEditIcon}
          onKeyDown={onClickEditIcon}
        />
      </div>
      <EditDialog
        opened={isDialogOn}
        timeData={timeData}
        type={type}
        onClose={onCloseEditModal}
      />
    </>
  );
};

export default TimeCell;
