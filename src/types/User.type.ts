import { ImageData } from "./ImageData.type";

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar: ImageData;
};

export type UserWithOptionalAvatar = Partial<Pick<User, "avatar">> &
  Omit<User, "avatar">;
