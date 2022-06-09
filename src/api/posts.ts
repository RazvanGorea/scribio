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

export async function getAllPosts() {
  const res = await client.get<Post[]>("/posts");
  return res.data;
}

export async function getRecentPosts() {
  const res = await client.get<PostPreview[]>("/posts/recent");
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
