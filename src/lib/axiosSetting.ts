import axios, { AxiosInstance } from "axios";

import { getCookie } from "@/lib/cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://www.club-timetable.p-e.kr",
  headers: {
    Authorization: `Bearer ${getCookie("accessToken")}`,
  },
});

export default axiosInstance;
