import { ActionIcon, createStyles } from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import { useState } from "react";

interface cellProps {
  color: string;
  rowSpan: number;
  user: string;
  isAdmin: boolean;
}

const useStyles = createStyles(
  (theme, { color, isAdmin }: cellProps, getRef) => ({
    cell: {
      color: theme.white,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors[color][7]
          : theme.colors[color][4],
      verticalAlign: "top",
      paddingLeft: 12,
      paddingTop: 12,
      position: "relative",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors[color][4]
            : theme.colors[color][7],
      },
    },
  })
);

const DataCell = ({ color, rowSpan, user, isAdmin }: cellProps) => {
  const { classes } = useStyles({ color, rowSpan, user, isAdmin });
  const [hover, setHover] = useState<boolean>(false);
  return (
    <td
      rowSpan={rowSpan}
      className={classes.cell}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {user}
      {hover && isAdmin ? (
        <div style={{ position: "absolute", top: 5, right: 5 }}>
          <ActionIcon>
            <IconEdit size={18} />
          </ActionIcon>
        </div>
      ) : null}
    </td>
  );
};

export default DataCell;
