import Link from "next/link";
import React from "react";
import { ImageData } from "../types/ImageData.type";
import Avatar from "./imageRelated/Avatar";

interface FollowItemProps {
  href: string;
  avatar: ImageData;
  username: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const FollowItem: React.FC<FollowItemProps> = ({
  href,
  username,
  avatar,
  onClick,
}) => {
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className="flex items-center transition-colors ease-out bg-black bg-opacity-0 cursor-pointer select-none dark:bg-white dark:bg-opacity-0 dark:hover:bg-opacity-10 hover:bg-opacity-10 active:bg-opacity-25 dark:active:bg-opacity-25"
      >
        <div className="m-2">
          <Avatar size={35} src={avatar} />
        </div>
        <span className="line-clamp-1">{username}</span>
      </a>
    </Link>
  );
};

export default FollowItem;
