import { SegmentedControl, createStyles } from "@mantine/core";
import axios from "axios";
import { useEffect, useState } from "react";

type timeBlock = {
  id: number;
  day: string;
  start: number;
  end: number;
  user: string;
};

type GetTimeBlockResponse = {
  data: timeBlock[];
};

interface TimeTableProps {
  type: string; // old | new
}

const useStyles = createStyles((theme, _params, getRef) => ({
  buttonWrapper: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
}));

const TimeTable = () => {
  const { classes } = useStyles();
  const [timeBlock, setTimeBlock] = useState<GetTimeBlockResponse>();
  const [type, setType] = useState<string>("old");
  async function getTimeBlocks() {
    try {
      const { data, status } = await axios.get<GetTimeBlockResponse>(
        "http://35.247.70.187:8080/demo/alltime",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(JSON.stringify(data, null, 4));
      console.log("response status is: ", status);

      setTimeBlock(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred.";
      }
    }
  }

  useEffect(() => {
    getTimeBlocks();
  }, []);

  return (
    <div>
      <div className={classes.buttonWrapper}>
        <SegmentedControl
          size="md"
          value={type}
          onChange={setType}
          data={[
            { label: "구관", value: "old" },
            { label: "신관", value: "new" },
          ]}
        />
      </div>
      {type}
    </div>
  );
};

export default TimeTable;
