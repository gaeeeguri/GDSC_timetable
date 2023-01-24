import axios from "axios";
import { useEffect, useState } from "react";

import { timeBlock } from "@/components/Types/type";
import axiosInstance from "@/lib/axiosSetting";

const FetchTimes = (type: string, isEdit: boolean) => {
  const [data, setData] = useState<Array<timeBlock>>([]);

  useEffect(() => {
    fetchTimes(type);
  }, [isEdit, type]);
  async function fetchTimes(type: string) {
    try {
      const { data, status } = await axiosInstance.get(`/${type}`);
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
