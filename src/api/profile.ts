import client from "./axios";
import { ImageData } from "../types/ImageData.type";
import { HistoryItem } from "../types/HistoryItem.type";

interface GetProfileResponse {
  username: string;
  email: string;
  _id: string;
  avatar: ImageData;
}

export async function getProfile() {
  const res = await client.get<GetProfileResponse>("/profile");
  return res.data;
}

export async function updateAvatar(avatar: File) {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const res = await client.patch<ImageData>(`/profile/avatar`, formData);
  return res.data;
}

export async function addToHistory(postId: string) {
  const res = await client.post<string>("/profile/history", { postId });
  return res.data;
}

export async function getHistory() {
  const res = await client.get<HistoryItem[]>("/profile/history");
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
