import axios from "axios";
import { signOut } from "next-auth/react";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_COOKIE, REFRESH_TOKEN_COOKIE } from "@/utils/constants";
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
let count = 0;

async function getStaticProps() {
  try {
    // const response = await axios.post(`${BASE_URL}/refreshToken/`, {
      // refresh: Cookies.get(REFRESH_TOKEN_COOKIE) || "",
    // });
    // return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchData() {
  try {
    const data = await getStaticProps() as any;
    // Cookies.set(ACCESS_TOKEN_COOKIE, data?.data?.access);
    return data;
  } catch (error: any) {
    if (error?.response?.status === 400 || error?.response?.status === 401) {
      if (count < 1) {
        // sendNotification("error", "Session Expired, Please Login");
        count += 1;
      }
      signOut({
        redirect: true,
        callbackUrl: "/login",
      });
      //Cookies.remove(ACCESS_TOKEN_COOKIE);
      //Cookies.remove(REFRESH_TOKEN_COOKIE);
    }
    throw error;
  }
}

export default fetchData;
