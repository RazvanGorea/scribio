import axios from "axios";
import config from "../config";

const client = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

export const setNewBearerToken = (token: string) => {
  client.defaults.headers.common = { Authorization: `Bearer ${token}` };
};

export const clearBearerToken = () => {
  client.defaults.headers.common = { Authorization: "" };
};

export default client;
