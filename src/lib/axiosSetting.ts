import axios, { AxiosInstance } from "axios";

import { getCookie } from "@/lib/cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://www.club-timetable.p-e.kr",
});

axiosInstance.interceptors.request.use(config => {
  if (!config.headers) return config;

  if (getCookie("accessToken") !== undefined) {
    config.headers.Authorization = `Bearer ${getCookie("accessToken")}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  res => res,
  async err => {
    const {
      config,
      response: { status },
    } = err;

    if (status == 403) {
      alert("로그인 시간이 만료되었습니다. 로그아웃 후 다시 로그인해주세요.");
    }

    if (status == 406) {
      alert("중복된 시간표는 추가될 수 없습니다.");
    }
  }
);

export default axiosInstance;
