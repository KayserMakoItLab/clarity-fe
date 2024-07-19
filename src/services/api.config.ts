import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE } from "@/utils/constants";

const instance = axios.create({});

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get(ACCESS_TOKEN_COOKIE)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
