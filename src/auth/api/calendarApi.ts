import axios from "axios";
import { getEnvVariables } from "../../helpers";

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});
calendarApi.interceptors.request.use((config) => {
  config.headers.set("x-token", localStorage.getItem("token") || "");
  return config;
});

export default calendarApi;
