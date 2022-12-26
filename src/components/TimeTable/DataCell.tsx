import {
  ActionIcon,
  Button,
  createStyles,
  Dialog,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { IconEdit } from "@tabler/icons";
import React, { useState } from "react";

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
  const [edit, setEdit] = useState<boolean>(false);
  return (
    <td
      rowSpan={rowSpan}
      className={classes.cell}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {user}
      {hover && isAdmin ? (
        <div
          role="presentation"
          style={{ position: "absolute", top: 5, right: 5 }}
          onClick={() => setEdit(true)}
          onKeyDown={() => setEdit(true)}
        >
          <ActionIcon>
            <IconEdit size={18} />
          </ActionIcon>
        </div>
      ) : null}
      <Dialog
        withCloseButton
        opened={edit}
        size="lg"
        radius="md"
        onClose={() => {
          setEdit(false);
          setHover(false);
        }}
      >
        <Text>Subscribe to email newsletter</Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={() => setEdit(false)}>Subscribe</Button>
        </Group>
      </Dialog>
    </td>
  );
};

export default DataCell;
