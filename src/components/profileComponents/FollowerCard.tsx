import Link from "next/link";
import React from "react";
import { ImageData } from "../../types/ImageData.type";
import Avatar from "../imageRelated/Avatar";

interface FollowerCardProps {
  avatar: ImageData;
  username: string;
  userId: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const FollowerCard: React.FC<FollowerCardProps> = ({
  avatar,
  username,
  userId,
  onClick,
}) => {
  return (
    <Link href={`/profile/${userId}`}>
      <a
        onClick={onClick}
        className="flex items-center w-full px-2 py-3 transition-colors ease-out bg-black bg-opacity-0 cursor-pointer dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 hover:bg-opacity-10 active:bg-opacity-25 dark:active:bg-opacity-25"
      >
        <Avatar src={avatar} />
        <span className="ml-2">{username}</span>
      </a>
    </Link>
  );
};

export default FollowerCard;
