import axios from "axios";
import jwtDecode from "jwt-decode";
import config from "../config";
import { refreshAccessToken } from "./auth";

const client = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: true,
});

interface TokenPayload {
  _id: string;
  username: string;
  email: string;
  exp: number;
  iat: number;
}

// On every request check if access token is expired, if so get new one
client.interceptors.request.use(async (req) => {
  const commonHeaders = req.headers?.common as any;
  const bearerToken: string = commonHeaders.Authorization;
  const token = bearerToken?.split(" ")[1];
  const dateNow = new Date();

  if (token) {
    const tokenPayload: TokenPayload = jwtDecode(token);

    // Check if token is expired or will expire in next 5 seconds
    if (tokenPayload.exp * 1000 < dateNow.getTime() - 5000) {
      try {
        // Get new access token
        const access_token = await refreshAccessToken();

        // Update token for current request
        commonHeaders.Authorization = `Bearer ${access_token}`;

        // Update token for future requests
        setNewBearerToken(access_token);
      } catch (error) {
        return;
      }
    }
  }

  return req;
});

export const setNewBearerToken = (token: string) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearBearerToken = () => {
  client.defaults.headers.common["Authorization"] = "";
};

export default client;
