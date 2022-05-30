import { OutputData } from "@editorjs/editorjs";
import { ImageData } from "./ImageData.type";

export type Post = {
  _id: string;
  title: string;
  createdAt: number;
  timeToRead: string;
  content: OutputData;
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
