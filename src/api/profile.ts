import client from "./axios";
import { ImageData } from "../types/ImageData.type";
import { HistoryItem } from "../types/HistoryItem.type";
import { BasicUser, UserPrivate } from "../types/User.type";

export async function getProfile() {
  const res = await client.get<UserPrivate>("/profile");
  return res.data;
}

export async function updateAvatar(avatar: File) {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const res = await client.patch<"success">(`/profile/avatar`, formData);
  return res.data;
}

export interface GetHistoryResponse {
  page: number;
  hasMore: boolean;
  data: HistoryItem[];
}

export async function getHistory(page = 0) {
  const res = await client.get<GetHistoryResponse>(
    `/profile/history?p=${page}`
  );
  return res.data;
}

export async function clearHistory() {
  const res = await client.delete<string>("/profile/history");
  return res.data;
}

export async function deleteHistoryItem(historyId: string) {
  const res = await client.delete<string>(`/profile/history/${historyId}`);
  return res.data;
}

export async function getFollowings() {
  const res = await client.get<BasicUser[]>(`profile/followings`);
  return res.data;
}

export async function getFollowers() {
  const res = await client.get<BasicUser[]>(`profile/followers`);
  return res.data;
}

export async function updateUsername(newUsername: string) {
  const res = await client.patch<"success">(`profile/username`, {
    username: newUsername,
  });
  return res.data;
}

export async function updateDescription(newDescription: string) {
  const res = await client.patch<"success">(`profile/description`, {
    description: newDescription,
  });
  return res.data;
}

export async function initEmailUpdate(newEmail: string) {
  const res = await client.patch<"success">(`profile/email/init`, {
    email: newEmail,
  });
  return res.data;
}

export async function finishEmailUpdate(confirmationCode: number) {
  const res = await client.patch<"success">(`profile/email/finish`, {
    code: confirmationCode,
  });
  return res.data;
}
