import axios from "axios";

export default (history = null) => {
  const baseURL = "https://gorest.co.in/public-api";
  const headers = {};

  headers.Authorization = `Bearer 295a677b863af8198591a78a21fcf743d5af3b693c3ab660c240e9cdb03f2303`;

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers,
  });

  return axiosInstance;
};