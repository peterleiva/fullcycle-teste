import axios, { type AxiosRequestConfig } from "axios";

const baseURL = process.env.REACT_APP_API_URL;

export default function HttpClientFactory(
  httpOptions: AxiosRequestConfig = {}
) {
  if (!baseURL) {
    throw new Error("Must define API_URL to proceed");
  }

  const http = axios.create({
    baseURL,
    ...httpOptions,
  });

  return http;
}
