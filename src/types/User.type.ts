import { ImageData } from "./ImageData.type";

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar: ImageData;
};
