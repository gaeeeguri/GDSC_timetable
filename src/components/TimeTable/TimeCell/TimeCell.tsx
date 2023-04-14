import { createStyles } from "@mantine/core";
import React, { Dispatch, SetStateAction, useState } from "react";

import EditButton from "@/components/TimeTable/TimeCell/atoms/editButton";
import colors from "@/Const/colors";
import TABLE_CONST from "@/Const/TABLE_CONST";

import { IsDeskTop, TableType, timeBlock } from "../../Types/type";
import EditDialog from "./EditDialog/EditDialog";

interface BlockStyleProps {
  start: number;
  end: number;
  color: string;
}

const useStyles = createStyles(
  (theme, { start, end, color }: BlockStyleProps, getRef) => ({
    block: {
      width: "100%",
      position: "absolute",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors[color][6]
          : theme.colors[color][4],
      marginTop: (start - 12) * TABLE_CONST.webHeight - 23,
      height: (end - start) * TABLE_CONST.webHeight - 1,
      zIndex: 5,
      [theme.fn.smallerThan("md")]: {
        fontSize: theme.fontSizes.sm,
      },
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

export interface CellProps extends IsDeskTop {
  type: TableType;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  isAdmin: boolean;
}

interface TimeCellProps extends CellProps {
  timeData: timeBlock;
}

const TimeCell = ({
  timeData,
  type,
  isEdit,
  setIsEdit,
  isAdmin,
  isDesktop,
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
        isDesktop={isDesktop}
        onClose={onCloseEditModal}
      />
    </>
  );
};

export default TimeCell;
