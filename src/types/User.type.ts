import { ImageData } from "./ImageData.type";

export type BasicUser = {
  _id: string;
  username: string;
  avatar: ImageData;
};

export interface UserPublicProfile extends BasicUser {
  description?: string;
  posts: number;
  registerDate: number;
}

export interface UserPrivate extends BasicUser {
  email: string;
}
