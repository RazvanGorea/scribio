import React from "react";
import Skeleton from "react-loading-skeleton";
import { ImageData } from "../../types/ImageData.type";
import Button from "../form/Button";
import Avatar from "../imageRelated/Avatar";
import { AiOutlineCheck } from "react-icons/ai";
import Link from "next/link";

interface AuthorDetailsBoxProps {
  uid: string;
  avatar: ImageData;
  username: string;
  userDescription: string;
  isFollowing?: boolean;
  followers?: number;
  onFollow: React.MouseEventHandler<HTMLButtonElement>;
}

const AuthorDetailsBox: React.FC<AuthorDetailsBoxProps> = ({
  uid,
  avatar,
  username,
  isFollowing,
  userDescription,
  followers,
  onFollow,
}) => {
  let followersText: JSX.Element | string = <Skeleton />;
  if (typeof followers !== "undefined")
    followersText = followers + (followers === 1 ? " Follower" : " Followers");

  return (
    <div className="sticky max-w-sm px-5 py-6 bg-white rounded-lg shadow-lg dark:bg-gray-700 h-fit top-[4.4rem]">
      <div className="flex">
        <Avatar href={`/profile/${uid}`} src={avatar} size={65} />
        <div className="pl-3">
          <h5>
            <Link href={`/profile/${uid}`}>
              <a>{username}</a>
            </Link>
          </h5>
          <h6 className="font-medium text-gray-500 ">{followersText}</h6>
        </div>
      </div>

      <p className="my-3 text-gray-500 line-clamp-6">{userDescription}</p>
      <Button
        onClick={onFollow}
        sm
        loading={typeof isFollowing === "undefined"}
        style={{ borderRadius: 30 }}
        active={isFollowing}
        icon={isFollowing ? AiOutlineCheck : undefined}
      >
        {isFollowing ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default AuthorDetailsBox;
