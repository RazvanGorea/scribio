import { OutputData } from "@editorjs/editorjs";
import { Post, PostMetrics, PostPreview } from "../types/Post.type";
import { ImageData } from "../types/ImageData.type";
import client from "./axios";

interface CreatePostProps {
  title: string;
  thumbnail: File;
  content: OutputData;
}

export async function createPost(data: CreatePostProps) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", JSON.stringify(data.content));
  formData.append("thumbnail", data.thumbnail);

  const res = await client.post<{ message: string; postId: string }>(
    "/posts",
    formData
  );
  return res.data;
}

interface UpdatePostProps {
  title: string;
  thumbnail?: File;
  content: OutputData;
}

export async function updatePost(postId: string, data: UpdatePostProps) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("content", JSON.stringify(data.content));
  if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

  const res = await client.patch<"success">(`/posts/${postId}`, formData);
  return res.data;
}

export async function deletePost(postId: string) {
  const res = await client.delete<"success">(`/posts/${postId}`);
  return res.data;
}

export interface GetPostsResponse {
  page: number;
  hasMore: boolean;
  data: PostPreview[];
}

export async function getPosts(page = 0, searchQuery?: string) {
  const res = await client.get<GetPostsResponse>(
    `/posts?p=${page}&search=${searchQuery}`
  );
  return res.data;
}

export async function getPostById(id: string) {
  const res = await client.get<Post>(`/posts/${id}`);
  return res.data;
}

export async function getAllPostsIds() {
  const res = await client.get<string[]>("/posts/ids");
  return res.data;
}

interface UploadImageResponse {
  success: number;
  file: ImageData;
}

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await client.post<UploadImageResponse>(
    "/posts/upload",
    formData,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

export async function uploadImageByUrl(url: string) {
  const res = await client.post<UploadImageResponse>("/posts/uploadByUrl", {
    url,
  });
  return res.data;
}

export async function likePost(postId: string) {
  const res = await client.post<"success" | "updated">(`/posts/${postId}/like`);
  return res.data;
}

export async function dislikePost(postId: string) {
  const res = await client.post<"success" | "updated">(
    `/posts/${postId}/dislike`
  );
  return res.data;
}

export async function registerPostView(postId: string) {
  const res = await client.post<"success">(`/posts/${postId}/registerView`);
  return res.data;
}

export async function getPostMetrics(postId: string) {
  const res = await client.get<PostMetrics>(`/posts/${postId}/metrics`);
  return res.data;
}

export async function deletePostAppreciation(postId: string) {
  const res = await client.delete<"success">(`/posts/${postId}/appreciation`);
  return res.data;
}

export async function savePost(postId: string) {
  const res = await client.post<"success">(`/posts/${postId}/save`);
  return res.data;
}

export async function unsavePost(postId: string) {
  const res = await client.delete<"success">(`/posts/${postId}/save`);
  return res.data;
}
