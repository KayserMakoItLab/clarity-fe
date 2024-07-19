import axios from "axios";
import Cookies from "js-cookie";
import fetchData from "./api.token.config";
import { ACCESS_TOKEN_COOKIE } from "@/utils/constants";

const instance = axios.create({});

instance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get(ACCESS_TOKEN_COOKIE)
    console.log("token", token);
    
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return fetchData()
        .then((resp) => {
          const access_token = resp?.data?.access || "";
          instance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${access_token}`;

          return instance(originalRequest);
        })
        .catch((fetchError) => {
          return Promise.reject(fetchError);
        });
    }
    return Promise.reject(err);
  }
);

export default instance;
