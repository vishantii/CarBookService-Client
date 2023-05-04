import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

interface CallAPIProps extends AxiosRequestConfig {
  token?: boolean;
  serverToken?: string;
}

export default async function callAPI({
  url,
  method,
  data,
  token,
  serverToken,
}: CallAPIProps) {
  const headers: { Authorization?: string } = {};

  if (serverToken) {
    headers.Authorization = `Bearer ${serverToken}`;
  } else if (token) {
    const tokenCookies = Cookies.get("token");

    if (tokenCookies) {
      const jwtToken = atob(tokenCookies);
      headers.Authorization = `Bearer ${jwtToken}`;
    }
  }

  try {
    const response = await axios({
      url,
      method,
      data,
      headers,
    });

    const { data: responseData } = response;
    const { length } = Object.keys(responseData);
    const res = {
      error: false,
      message: "success",
      data: length > 1 ? responseData : responseData.data,
    };

    return res;
  } catch (error: any) {
    const res = {
      error: true,
      message: error.response.data.message,
      data: null,
    };

    return res;
  }
}
