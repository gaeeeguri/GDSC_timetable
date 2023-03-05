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
      alert(
        "다음 중 한 가지 문제가 발생했습니다. \n 1. 인증 시간이 끝나 다시 로그인해야 합니다. \n 2. 아이디 또는 비밀번호가 틀렸습니다."
      );
    }

    if (status == 406) {
      alert("중복된 시간표는 추가될 수 없습니다.");
    }
  }
);

export default axiosInstance;
