import { OutputData } from "@editorjs/editorjs";
import { ImageData } from "./ImageData.type";

export type AudioData = {
  url: string;
  key: string;
};

export type Post = {
  _id: string;
  title: string;
  createdAt: number;
  timeToRead: string;
  content: OutputData;
  audio: AudioData;
  author: {
    _id: string;
    username: string;
    avatar: ImageData;
  };
  thumbnail: ImageData;
};

export type PostPreview = {
  _id: string;
  title: string;
  createdAt: number;
  timeToRead: string;
  author: {
    _id: string;
    username: string;
    avatar: ImageData;
  };
  thumbnail: ImageData;
  previewContent: string;
};

export type PostMetrics = {
  likes: number;
  dislikes: number;
  saves: number;
  views: number;
  userAppreciation: "like" | "dislike" | null;
  isSaved: boolean;
};
