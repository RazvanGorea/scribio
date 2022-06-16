import { PostPreview } from "../types/Post.type";
import { PostSort } from "../types/PostSort.type";
import { UserPublicProfile } from "../types/User.type";
import client from "./axios";
import { GetPostsResponse } from "./posts";

export async function getPublicUserProfile(uid: string) {
  const res = await client.get<UserPublicProfile>(`/users/${uid}`);
  return res.data;
}

export async function getUserDescription(uid: string) {
  const res = await client.get<string>(`/users/${uid}/description`);
  return res.data;
}

export async function getUserTotalViews(uid: string) {
  const res = await client.get<number>(`/users/${uid}/views`);
  return res.data;
}

export async function getAllUserIds() {
  const res = await client.get<string[]>("/users/ids");
  return res.data;
}

export async function getUserPosts(
  uid: string,
  page = 0,
  sort: PostSort | string = "newer"
) {
  const res = await client.get<GetPostsResponse>(
    `users/${uid}/posts?p=${page}&sort=${sort}`
  );
  return res.data;
}

export async function getUserPostsId(uid: string) {
  const res = await client.get<string[]>(`/users/${uid}/posts/id`);
  return res.data;
}

export async function getUserFollowersNumber(uid: string) {
  const res = await client.get<number>(`/users/${uid}/followers`);
  return res.data;
}

export async function isFollowing(uid: string) {
  const res = await client.get<boolean>(`/users/${uid}/follow`);
  return res.data;
}

export async function followUser(uid: string) {
  const res = await client.post<"success">(`/users/${uid}/follow`);
  return res.data;
}

export async function unfollowUser(uid: string) {
  const res = await client.delete<"success">(`/users/${uid}/follow`);
  return res.data;
}
