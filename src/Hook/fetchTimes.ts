import axios from "axios";
import { useEffect, useState } from "react";

import { timeBlock } from "@/components/Types/type";

const FetchTimes = (type: string, edit: boolean) => {
  const [data, setData] = useState<Array<timeBlock>>([]);

  useEffect(() => {
    fetchTimes(type);
  }, [edit]);
  async function fetchTimes(type: string) {
    try {
      const { data, status } = await axios.get<timeBlock[]>(
        `http://35.247.70.187:8080/${type}`,
        {
          headers: {
            Accept: "Application/json",
          },
        }
      );

      setData(data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.log("error message: ", e.message);
        return e.message;
      } else {
        console.log("unexpected error: ", e);
        return "An unexpected error occurred.";
      }
    }
  }
  return data;
};

export default FetchTimes;
