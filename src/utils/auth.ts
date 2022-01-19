import { getProfile, refreshAccessToken } from "../api/auth";
import { setNewBearerToken } from "../api/axios";
import { User } from "../types/User.type";

// Check if code runs client side
const isClient = typeof window !== "undefined";

export async function initAuth() {
  const access_token = await refreshAccessToken();

  if (!access_token) throw new Error("Invalid refresh token!");

  // Send access token with all future requests
  setNewBearerToken(access_token);

  const user = await getProfile();

  return { user, access_token };
}

// Save user profile in local storage
export function setCachedUser(user: User) {
  if (!isClient) return;

  window.localStorage.setItem("user", JSON.stringify(user));
}

// Get cached user from local storage
export function getCachedUser() {
  if (!isClient) return;

  const data = window.localStorage.getItem("user");
  if (data) {
    return JSON.parse(data) as User;
  }
}

export function clearCachedUser() {
  if (!isClient) return;

  window.localStorage.removeItem("user");
}
