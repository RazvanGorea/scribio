import { ImageData } from "../types/ImageData.type";
import client from "./axios";

export async function updateAvatar(uid: string, avatar: File) {
  const formData = new FormData();
  formData.append("avatar", avatar);

  const res = await client.patch<ImageData>(`users/${uid}/avatar`, formData);
  return res.data;
}
