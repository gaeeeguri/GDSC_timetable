import { createStyles } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React from "react";

const useStyles = createStyles((theme, color: string, getRef) => ({
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
}));

export interface EditButtonProps {
  onClickEdit: React.MouseEventHandler<HTMLDivElement>;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  isVisible: boolean;
  color: string;
}

const EditButton = ({
  onClickEdit,
  isVisible,
  onKeyDown,
  color,
}: EditButtonProps) => {
  const { classes } = useStyles(color);

  return (
    <div
      role="presentation"
      style={{ position: "absolute", top: 10, right: 10 }}
    >
      {isVisible ? (
        <div
          className={classes.editButton}
          role="presentation"
          onClick={onClickEdit}
          onKeyDown={onKeyDown}
        >
          <IconEdit size={18} />
        </div>
      ) : null}
    </div>
  );
};

export default EditButton;
