import { PostPreview } from "../types/Post.type";
import { User } from "../types/User.type";
import client from "./axios";

export async function getUserData(uid: string) {
  const res = await client.get<User>(`users/${uid}`);
  return res.data;
}

export async function getAllUserIds() {
  const res = await client.get<string[]>("users/ids");
  return res.data;
}

export async function getUserPosts(uid: string) {
  const res = await client.get<PostPreview[]>(`users/${uid}/posts`);
  return res.data;
}
