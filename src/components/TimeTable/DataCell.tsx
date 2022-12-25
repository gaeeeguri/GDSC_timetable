import { createStyles } from "@mantine/core";

interface cellProps {
  color: string;
  rowSpan: number;
  user: string;
}

const useStyles = createStyles((theme, { color }: cellProps, getRef) => ({
  cell: {
    color: theme.white,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors[color][7]
        : theme.colors[color][4],
    verticalAlign: "top",
    paddingLeft: 12,
    paddingTop: 12,
  },
}));

const DataCell = ({ color, rowSpan, user }: cellProps) => {
  const { classes } = useStyles({ color, rowSpan, user });
  return (
    <td rowSpan={rowSpan} className={classes.cell}>
      {user}
    </td>
  );
};

export default DataCell;
