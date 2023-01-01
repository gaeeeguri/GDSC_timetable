import { createStyles } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React, { useState } from "react";

interface BlockProps {
  color: string;
  start: number;
  end: number;
  user: string;
}

const useStyles = createStyles(
  (theme, { color, start, end }: BlockProps, getRef) => ({
    block: {
      width: "8vw",
      maxWidth: 1130 / 8 + 1,
      minWidth: 45,
      position: "absolute",
      marginLeft: -1,
      // boxSizing: "border-box",
      borderRight:
        theme.colorScheme === "dark"
          ? `1px solid ${theme.colors.dark[4]}`
          : `1px solid ${theme.colors.gray[3]}`,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors[color][6]
          : theme.colors[color][4],
      marginTop: (start - 12) * 47 - 23,
      height: (end - start) * 47 - 1,
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

const TimeCell = ({ color, start, end, user }: BlockProps) => {
  const { classes } = useStyles({ color, start, end, user });
  const [hover, setHover] = useState<boolean>(false);

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className={classes.block}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {user}
      <div
        role="presentation"
        style={{ position: "absolute", top: 10, right: 10 }}
      >
        {hover ? (
          <div className={classes.editButton}>
            <IconEdit size={18} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TimeCell;
