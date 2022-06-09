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

  const res = await client.patch<ImageData>(`/profile/avatar`, formData);
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
  const res = await client.post<BasicUser[]>(`profile/followings`);
  return res.data;
}

export async function getFollowers() {
  const res = await client.post<BasicUser[]>(`profile/followers`);
  return res.data;
}
